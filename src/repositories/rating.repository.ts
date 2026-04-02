import prisma from '../config/database';

export class RatingRepository {
  async findByUserAndCourse(userId: number, courseId: number) {
    return prisma.rating.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
  }

  async findById(id: number) {
    return prisma.rating.findUnique({ where: { id } });
  }

  async findByCourse(courseId: number) {
    return prisma.rating.findMany({
      where: { courseId },
      include: {
        user: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: { userId: number; courseId: number; rating: number; review?: string }) {
    return prisma.rating.create({
      data,
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
  }

  async update(id: number, data: { rating?: number; review?: string }) {
    return prisma.rating.update({
      where: { id },
      data,
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
  }

  async delete(id: number) {
    return prisma.rating.delete({ where: { id } });
  }
}

export const ratingRepository = new RatingRepository();
