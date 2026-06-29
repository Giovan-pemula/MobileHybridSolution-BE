import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class EnrollmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserAndCourse(userId: number, courseId: number) {
    return this.prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            category: true,
            trainer: { select: { id: true, name: true, avatar: true } },
            _count: { select: { sections: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: number, courseId: number) {
    return this.prisma.enrollment.create({
      data: { userId, courseId },
      include: {
        course: {
          include: {
            category: true,
            trainer: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
    });
  }

  async updateProgress(userId: number, courseId: number, progress: number, completed: boolean) {
    return this.prisma.enrollment.update({
      where: { userId_courseId: { userId, courseId } },
      data: { progress, completed },
    });
  }
}
