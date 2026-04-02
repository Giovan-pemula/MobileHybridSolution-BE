import prisma from '../config/database';

export class WishlistRepository {
  async findByUser(userId: number) {
    return prisma.wishlist.findMany({
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
    return prisma.wishlist.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
  }

  async create(userId: number, courseId: number) {
    return prisma.wishlist.create({
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
    return prisma.wishlist.delete({
      where: { userId_courseId: { userId, courseId } },
    });
  }
}

export const wishlistRepository = new WishlistRepository();
