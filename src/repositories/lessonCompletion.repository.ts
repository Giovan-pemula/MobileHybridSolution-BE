import prisma from '../config/database';

export class LessonCompletionRepository {
  async findByUserAndLesson(userId: number, lessonId: number) {
    return prisma.lessonCompletion.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });
  }

  async toggleCompletion(userId: number, lessonId: number) {
    const existing = await this.findByUserAndLesson(userId, lessonId);

    if (existing) {
      // Toggle: if completed, mark incomplete and vice versa
      return prisma.lessonCompletion.update({
        where: { userId_lessonId: { userId, lessonId } },
        data: {
          completed: !existing.completed,
          completedAt: !existing.completed ? new Date() : existing.completedAt,
        },
      });
    }

    return prisma.lessonCompletion.create({
      data: { userId, lessonId, completed: true },
    });
  }

  async getCompletedByUserAndCourse(userId: number, courseId: number) {
    return prisma.lessonCompletion.findMany({
      where: {
        userId,
        completed: true,
        lesson: { section: { courseId } },
      },
    });
  }

  async getLearningAnalytics(userId: number) {
    const totalCompleted = await prisma.lessonCompletion.count({
      where: { userId, completed: true },
    });

    const totalEnrolled = await prisma.enrollment.count({
      where: { userId },
    });

    const completedCourses = await prisma.enrollment.count({
      where: { userId, completed: true },
    });

    // Daily progress for last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyCompletions = await prisma.lessonCompletion.groupBy({
      by: ['completedAt'],
      where: {
        userId,
        completed: true,
        completedAt: { gte: thirtyDaysAgo },
      },
      _count: { id: true },
    });

    return {
      totalLessonsCompleted: totalCompleted,
      totalCoursesEnrolled: totalEnrolled,
      totalCoursesCompleted: completedCourses,
      dailyProgress: dailyCompletions,
    };
  }
}

export const lessonCompletionRepository = new LessonCompletionRepository();
