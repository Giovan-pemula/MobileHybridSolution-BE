import prisma from '../config/database';

export class EnrollmentRepository {
  async findByUserAndCourse(userId: number, courseId: number) {
    return prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId } },
    });
  }

  async findByUser(userId: number) {
    return prisma.enrollment.findMany({
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
    return prisma.enrollment.create({
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
    return prisma.enrollment.update({
      where: { userId_courseId: { userId, courseId } },
      data: { progress, completed },
    });
  }
}

export const enrollmentRepository = new EnrollmentRepository();
