import { enrollmentRepository } from '../repositories/enrollment.repository';
import { courseRepository } from '../repositories/course.repository';
import prisma from '../config/database';

export class EnrollmentService {
  async getMyCourses(userId: number) {
    const enrollments = await enrollmentRepository.findByUser(userId);

    // Calculate progress for each enrollment based on lesson completions
    const enrichedEnrollments = await Promise.all(
      enrollments.map(async (enrollment) => {
        const totalLessons = await prisma.lesson.count({
          where: { section: { courseId: enrollment.courseId } },
        });

        const completedLessons = await prisma.lessonCompletion.count({
          where: { userId, lesson: { section: { courseId: enrollment.courseId } }, completed: true },
        });

        const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        const completed = totalLessons > 0 && completedLessons === totalLessons;

        return {
          ...enrollment,
          progress,
          completed,
          totalLessons,
          completedLessons,
        };
      }),
    );

    return enrichedEnrollments;
  }

  async enrollInCourse(userId: number, courseId: number) {
    const course = await courseRepository.findById(courseId);
    if (!course) throw new Error('COURSE_NOT_FOUND');

    const existing = await enrollmentRepository.findByUserAndCourse(userId, courseId);
    if (existing) throw new Error('ALREADY_ENROLLED');

    return enrollmentRepository.create(userId, courseId);
  }
}

export const enrollmentService = new EnrollmentService();
