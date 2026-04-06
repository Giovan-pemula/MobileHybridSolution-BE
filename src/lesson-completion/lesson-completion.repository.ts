import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class LessonCompletionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserAndLesson(userId: number, lessonId: number) {
    return this.prisma.lessonCompletion.findUnique({
      where: { userId_lessonId: { userId, lessonId } },
    });
  }

  async toggleCompletion(userId: number, lessonId: number) {
    const existing = await this.findByUserAndLesson(userId, lessonId);
    if (existing) {
      return this.prisma.lessonCompletion.update({
        where: { userId_lessonId: { userId, lessonId } },
        data: {
          completed: !existing.completed,
          completedAt: !existing.completed ? new Date() : existing.completedAt,
        },
      });
    }
    return this.prisma.lessonCompletion.create({
      data: { userId, lessonId, completed: true },
    });
  }

  async getLearningAnalytics(userId: number) {
    const totalCompleted = await this.prisma.lessonCompletion.count({ where: { userId, completed: true } });
    const totalEnrolled = await this.prisma.enrollment.count({ where: { userId } });
    const completedCourses = await this.prisma.enrollment.count({ where: { userId, completed: true } });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailyCompletions = await this.prisma.lessonCompletion.groupBy({
      by: ['completedAt'],
      where: { userId, completed: true, completedAt: { gte: thirtyDaysAgo } },
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
