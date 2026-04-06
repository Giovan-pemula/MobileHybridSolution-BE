import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  avatar: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(skip: number, limit: number) {
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({ skip, take: limit, select: userSelect, orderBy: { createdAt: 'desc' } }),
      this.prisma.user.count(),
    ]);
    return { users, total };
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id }, select: userSelect });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: { name?: string; email?: string; avatar?: string; role?: string }) {
    return this.prisma.user.update({ where: { id }, data: data as any, select: userSelect });
  }

  async delete(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
