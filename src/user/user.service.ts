import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { parsePagination, paginatedResponse } from '../utils/pagination';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(query: { page?: string; limit?: string }) {
    const pagination = parsePagination(query);
    const { users, total } = await this.userRepository.findAll(pagination.skip, pagination.limit);
    return paginatedResponse(users, total, pagination.page, pagination.limit);
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(id: number, data: { name?: string; email?: string; avatar?: string }) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (data.email && data.email !== user.email) {
      const existing = await this.userRepository.findByEmail(data.email);
      if (existing) throw new ConflictException('Email already in use');
    }
    return this.userRepository.update(id, data);
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.delete(id);
  }
}
