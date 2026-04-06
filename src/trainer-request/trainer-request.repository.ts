import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class TrainerRequestRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: number) {
    return this.prisma.trainerRequest.findUnique({ where: { userId } });
  }

  async findById(id: number) {
    return this.prisma.trainerRequest.findUnique({
      where: { id },
      include: { user: { select: { id: true, name: true, email: true, avatar: true, role: true } } },
    });
  }

  async findAll(status?: string) {
    const where = status ? { status: status as any } : {};
    return this.prisma.trainerRequest.findMany({
      where,
      include: { user: { select: { id: true, name: true, email: true, avatar: true, role: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: { userId: number; cvUrl: string; bio: string; experience: string }) {
    return this.prisma.trainerRequest.create({
      data,
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }

  async updateStatus(id: number, status: string) {
    return this.prisma.trainerRequest.update({
      where: { id },
      data: { status: status as any },
      include: { user: { select: { id: true, name: true, email: true, role: true } } },
    });
  }
}
