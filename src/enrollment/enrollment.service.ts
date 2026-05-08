import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { EnrollmentRepository } from './enrollment.repository';
import { CourseRepository } from '../course/course.repository';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly courseRepository: CourseRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getMyCourses(userId: number) {
    const enrollments = await this.enrollmentRepository.findByUser(userId);
    return Promise.all(enrollments.map(async (enrollment) => {
      const totalLessons = await this.prisma.lesson.count({
        where: { section: { courseId: enrollment.courseId } },
      });
      const completedLessons = await this.prisma.lessonCompletion.count({
        where: { userId, lesson: { section: { courseId: enrollment.courseId } }, completed: true },
      });
      const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
      const completed = totalLessons > 0 && completedLessons === totalLessons;
      return { ...enrollment, progress, completed, totalLessons, completedLessons };
    }));
  }

  async enrollInCourse(userId: number, courseId: number) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) throw new NotFoundException('Course not found');

    if (!course.isFree) {
      throw new ForbiddenException(
        'This course requires purchase. please purchase the course and enroll.',
      );
    }

    const existing = await this.enrollmentRepository.findByUserAndCourse(userId, courseId);
    if (existing) throw new ConflictException('Already enrolled in this course');
    return this.enrollmentRepository.create(userId, courseId);
  }
}
