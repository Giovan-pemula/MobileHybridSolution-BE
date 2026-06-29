import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class WishlistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUser(userId: number) {
    return this.prisma.wishlist.findMany({
      where: { userId },
      include: {
        course: {
          include: {
            category: true,
            trainer: { select: { id: true, name: true, avatar: true } },
            _count: { select: { enrollments: true } },
          },
        },
      },
    });
  }

  async findByUserAndCourse(userId: number, courseId: number) {
    return this.prisma.wishlist.findUnique({ where: { userId_courseId: { userId, courseId } } });
  }

  async create(userId: number, courseId: number) {
    return this.prisma.wishlist.create({
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

  async delete(userId: number, courseId: number) {
    return this.prisma.wishlist.delete({ where: { userId_courseId: { userId, courseId } } });
  }
}
