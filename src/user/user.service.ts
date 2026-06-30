import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { R2Service } from '../common/storage/r2.service';
import { parsePagination, paginatedResponse } from '../utils/pagination';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly r2Service: R2Service,
  ) {}

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

  async getPublicProfile(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    if (user.role === 'ADMIN') throw new ForbiddenException('Profile not available');
    return user;
  }

  async updateProfile(id: number, data: { name?: string }) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return this.userRepository.update(id, data);
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
    return this.userRepository.delete(id);
  }

  async uploadAvatar(id: number, file: Express.Multer.File) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (user.avatar) {
      await this.r2Service.deleteFile(user.avatar).catch(() => null);
    }

    const avatarUrl = await this.r2Service.uploadFile(file, 'avatars');
    return this.userRepository.update(id, { avatar: avatarUrl });
  }
}
