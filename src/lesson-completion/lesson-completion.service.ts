import { Injectable } from '@nestjs/common';
import { LessonCompletionRepository } from './lesson-completion.repository';
import { GamificationService } from '../gamification/gamification.service';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class LessonCompletionService {
  constructor(
    private readonly lessonCompletionRepository: LessonCompletionRepository,
    private readonly gamificationService: GamificationService,
    private readonly prisma: PrismaService,
  ) {}

  async toggleLessonCompletion(userId: number, lessonId: number) {
    const existing = await this.lessonCompletionRepository.findByUserAndLesson(userId, lessonId);
    const result = await this.lessonCompletionRepository.toggleCompletion(userId, lessonId);

    // If it was just newly completed (didn't exist before)
    if (!existing && result.completed) {
      // 1. Check for Daily First Mark (Streak)
      await this.gamificationService.handleDailyFirstMark(userId);

      // 2. Grant 3 XP for Lesson Complete
      await this.gamificationService.addXp(userId, 3, 'LESSON_COMPLETE');

      // 3. Check if Section Complete
      const lesson = await this.prisma.lesson.findUnique({
        where: { id: lessonId },
        include: { section: { include: { lessons: true } } },
      });

      if (lesson) {
        const sectionLessons = lesson.section.lessons.map(l => l.id);
        const completedSectionLessons = await this.prisma.lessonCompletion.count({
          where: { userId, lessonId: { in: sectionLessons }, completed: true },
        });

        if (completedSectionLessons === sectionLessons.length) {
          await this.gamificationService.addXp(userId, 5, 'SECTION_COMPLETE');

          // 4. Check if Course Complete
          const courseSections = await this.prisma.section.findMany({
            where: { courseId: lesson.section.courseId },
            include: { lessons: true },
          });

          const allCourseLessons = courseSections.flatMap(s => s.lessons.map(l => l.id));
          const completedCourseLessons = await this.prisma.lessonCompletion.count({
            where: { userId, lessonId: { in: allCourseLessons }, completed: true },
          });

          if (completedCourseLessons === allCourseLessons.length) {
            await this.gamificationService.addXp(userId, 30, 'COURSE_COMPLETE');
            // Also mark enrollment as completed
            await this.prisma.enrollment.update({
              where: { userId_courseId: { userId, courseId: lesson.section.courseId } },
              data: { completed: true, progress: 100 },
            });
          }
        }
      }
    }

    return result;
  }

  async getLearningAnalytics(userId: number) {
    return this.lessonCompletionRepository.getLearningAnalytics(userId);
  }
}
