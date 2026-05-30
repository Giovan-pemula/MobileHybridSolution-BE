import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { OrderStatus } from '../../generated/prisma/enums';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                price: true,
                thumbnail: true,
              },
            },
          },
        },
      },
    });
  }

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
        status: total === 0 ? OrderStatus.COMPLETED : OrderStatus.PENDING,
        items: { create: items },
      },
      include: {
        items: {
          include: {
            course: {
              select: {
                id: true,
                title: true,
                price: true,
                thumbnail: true,
              },
            },
          },
        },
      },
    });
  }

  async updateStatus(id: number, status: OrderStatus) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: { course: true },
        },
      },
    });
  }
}
