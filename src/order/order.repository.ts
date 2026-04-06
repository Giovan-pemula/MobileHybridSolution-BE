import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            course: {
              include: {
                category: true,
                trainer: { select: { id: true, name: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: number, items: { courseId: number; price: number }[]) {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return this.prisma.order.create({
      data: {
        userId,
        total,
        status: 'COMPLETED',
        items: { create: items },
      },
      include: {
        items: {
          include: { course: { include: { category: true } } },
        },
      },
    });
  }
}
