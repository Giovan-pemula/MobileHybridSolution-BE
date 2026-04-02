import { courseRepository, CourseFilters } from '../repositories/course.repository';
import { PaginationParams, paginatedResponse } from '../utils/pagination';

export class CourseService {
  async getAllCourses(pagination: PaginationParams, filters: CourseFilters) {
    const { courses, total } = await courseRepository.findAll(pagination.skip, pagination.limit, filters);
    return paginatedResponse(courses, total, pagination.page, pagination.limit);
  }

  async getCourseById(id: number) {
    const course = await courseRepository.findById(id);
    if (!course) throw new Error('COURSE_NOT_FOUND');

    const avgRating =
      course.ratings.length > 0
        ? course.ratings.reduce((sum, r) => sum + r.rating, 0) / course.ratings.length
        : 0;
    const { ratings, ...rest } = course;
    return { ...rest, averageRating: Math.round(avgRating * 10) / 10 };
  }

  async createCourse(
    trainerId: number,
    data: {
      title: string;
      description?: string;
      price?: number;
      isFree?: boolean;
      thumbnail?: string;
      previewYoutubeUrl?: string;
      categoryId: number;
      status?: string;
    },
  ) {
    return courseRepository.create({ ...data, trainerId });
  }

  async updateCourse(id: number, userId: number, userRole: string, data: any) {
    const course = await courseRepository.findById(id);
    if (!course) throw new Error('COURSE_NOT_FOUND');

    if (userRole !== 'ADMIN' && course.trainerId !== userId) {
      throw new Error('FORBIDDEN');
    }

    return courseRepository.update(id, data);
  }

  async deleteCourse(id: number, userId: number, userRole: string) {
    const course = await courseRepository.findById(id);
    if (!course) throw new Error('COURSE_NOT_FOUND');

    if (userRole !== 'ADMIN' && course.trainerId !== userId) {
      throw new Error('FORBIDDEN');
    }

    await courseRepository.delete(id);
  }

  async getCourseStudents(courseId: number, pagination: PaginationParams, userId: number, userRole: string) {
    const course = await courseRepository.findById(courseId);
    if (!course) throw new Error('COURSE_NOT_FOUND');

    if (userRole !== 'ADMIN' && course.trainerId !== userId) {
      throw new Error('FORBIDDEN');
    }

    const { enrollments, total } = await courseRepository.getStudents(courseId, pagination.skip, pagination.limit);
    return paginatedResponse(enrollments, total, pagination.page, pagination.limit);
  }
}

export const courseService = new CourseService();
