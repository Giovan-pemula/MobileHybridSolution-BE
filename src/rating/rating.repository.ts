import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class RatingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserAndCourse(userId: number, courseId: number) {
    return this.prisma.rating.findUnique({ where: { userId_courseId: { userId, courseId } } });
  }

  async findById(id: number) {
    return this.prisma.rating.findUnique({ where: { id } });
  }

  async findByCourse(courseId: number) {
    return this.prisma.rating.findMany({
      where: { courseId },
      include: { user: { select: { id: true, name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: { userId: number; courseId: number; rating: number; review?: string }) {
    return this.prisma.rating.create({
      data,
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
  }

  async update(id: number, data: { rating?: number; review?: string }) {
    return this.prisma.rating.update({
      where: { id }, data,
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
  }

  async delete(id: number) {
    return this.prisma.rating.delete({ where: { id } });
  }
}
