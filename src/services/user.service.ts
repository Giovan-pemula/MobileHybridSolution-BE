import { userRepository } from '../repositories/user.repository';
import { PaginationParams, paginatedResponse } from '../utils/pagination';

export class UserService {
  async getAllUsers(pagination: PaginationParams) {
    const { users, total } = await userRepository.findAll(pagination.skip, pagination.limit);
    return paginatedResponse(users, total, pagination.page, pagination.limit);
  }

  async getUserById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    return user;
  }

  async updateUser(id: number, data: { name?: string; email?: string; avatar?: string }) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    if (data.email && data.email !== user.email) {
      const existing = await userRepository.findByEmail(data.email);
      if (existing) {
        throw new Error('EMAIL_ALREADY_EXISTS');
      }
    }

    return userRepository.update(id, data);
  }

  async deleteUser(id: number) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }
    await userRepository.delete(id);
  }
}

export const userService = new UserService();
