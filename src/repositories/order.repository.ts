import prisma from '../config/database';

export class OrderRepository {
  async findByUser(userId: number) {
    return prisma.order.findMany({
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

  async findById(id: number) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            course: {
              include: { category: true },
            },
          },
        },
      },
    });
  }

  async create(userId: number, items: { courseId: number; price: number }[]) {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return prisma.order.create({
      data: {
        userId,
        total,
        status: 'COMPLETED',
        items: {
          create: items,
        },
      },
      include: {
        items: {
          include: {
            course: {
              include: { category: true },
            },
          },
        },
      },
    });
  }
}

export const orderRepository = new OrderRepository();
