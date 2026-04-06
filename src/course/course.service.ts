import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CourseRepository, CourseFilters } from './course.repository';
import { parsePagination, paginatedResponse } from '../utils/pagination';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async getAllCourses(query: Record<string, any>) {
    const pagination = parsePagination(query);
    const filters: CourseFilters = {};
    if (query['categoryId']) filters.categoryId = parseInt(query['categoryId'], 10);
    if (query['search']) filters.search = query['search'];
    if (query['isFree'] === 'true') filters.isFree = true;
    else if (query['isFree'] === 'false') filters.isFree = false;
    if (query['minPrice']) filters.minPrice = parseFloat(query['minPrice']);
    if (query['maxPrice']) filters.maxPrice = parseFloat(query['maxPrice']);
    filters.status = query['status'] || 'PUBLISHED';

    const { courses, total } = await this.courseRepository.findAll(pagination.skip, pagination.limit, filters);
    return paginatedResponse(courses, total, pagination.page, pagination.limit);
  }

  async getCourseById(id: number) {
    const course = await this.courseRepository.findById(id);
    if (!course) throw new NotFoundException('Course not found');

    const avgRating = course.ratings.length > 0
      ? course.ratings.reduce((sum, r) => sum + r.rating, 0) / course.ratings.length : 0;
    const { ratings, ...rest } = course;
    return { ...rest, averageRating: Math.round(avgRating * 10) / 10 };
  }

  async createCourse(trainerId: number, data: any) {
    return this.courseRepository.create({ ...data, trainerId });
  }

  async updateCourse(id: number, userId: number, userRole: string, data: any) {
    const course = await this.courseRepository.findById(id);
    if (!course) throw new NotFoundException('Course not found');
    if (userRole !== 'ADMIN' && course.trainerId !== userId) throw new ForbiddenException('You can only edit your own courses');
    return this.courseRepository.update(id, data);
  }

  async deleteCourse(id: number, userId: number, userRole: string) {
    const course = await this.courseRepository.findById(id);
    if (!course) throw new NotFoundException('Course not found');
    if (userRole !== 'ADMIN' && course.trainerId !== userId) throw new ForbiddenException('You can only delete your own courses');
    await this.courseRepository.delete(id);
  }

  async getCourseStudents(courseId: number, query: Record<string, any>, userId: number, userRole: string) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) throw new NotFoundException('Course not found');
    if (userRole !== 'ADMIN' && course.trainerId !== userId) throw new ForbiddenException('Access denied');

    const pagination = parsePagination(query);
    const { enrollments, total } = await this.courseRepository.getStudents(courseId, pagination.skip, pagination.limit);
    return paginatedResponse(enrollments, total, pagination.page, pagination.limit);
  }
}
