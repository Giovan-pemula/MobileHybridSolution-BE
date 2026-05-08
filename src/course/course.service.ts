import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CourseRepository, CourseFilters } from './course.repository';
import { R2Service } from '../common/storage/r2.service';
import { PrismaService } from '../common/prisma/prisma.service';
import { parsePagination, paginatedResponse } from '../utils/pagination';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly r2Service: R2Service,
    private readonly prisma: PrismaService,
  ) {}

  async getAllCourses(query: Record<string, any>) {
    const pagination = parsePagination(query);
    const filters: CourseFilters = {};
    if (query['categoryId']) filters.categoryId = parseInt(query['categoryId'], 10);
    if (query['search']) filters.search = query['search'];
    if (query['isFree'] === 'true') filters.isFree = true;
    else if (query['isFree'] === 'false') filters.isFree = false;
    if (query['minPrice']) filters.minPrice = parseFloat(query['minPrice']);
    if (query['maxPrice']) filters.maxPrice = parseFloat(query['maxPrice']);
    // Public catalog: default to PUBLISHED only — never show ARCHIVED or DRAFT
    const requestedStatus = query['status'];
    filters.status = requestedStatus === 'DRAFT' ? 'DRAFT' : 'PUBLISHED';

    const { courses, total } = await this.courseRepository.findAll(pagination.skip, pagination.limit, filters);
    return paginatedResponse(courses, total, pagination.page, pagination.limit);
  }

  // Used by TRAINER/ADMIN — can see DRAFT & ARCHIVED courses too
  async getAllCoursesForAdmin(query: Record<string, any>) {
    const pagination = parsePagination(query);
    const filters: CourseFilters = {};
    if (query['categoryId']) filters.categoryId = parseInt(query['categoryId'], 10);
    if (query['search']) filters.search = query['search'];
    if (query['isFree'] === 'true') filters.isFree = true;
    else if (query['isFree'] === 'false') filters.isFree = false;
    if (query['minPrice']) filters.minPrice = parseFloat(query['minPrice']);
    if (query['maxPrice']) filters.maxPrice = parseFloat(query['maxPrice']);
    if (query['status']) filters.status = query['status'];
    if (query['trainerId']) filters.trainerId = parseInt(query['trainerId'], 10);

    const { courses, total } = await this.courseRepository.findAll(pagination.skip, pagination.limit, filters);
    return paginatedResponse(courses, total, pagination.page, pagination.limit);
  }

  async getCourseById(id: number) {
    const course = await this.courseRepository.findById(id);
    if (!course) throw new NotFoundException('Course not found');
    // ARCHIVED and DRAFT courses are hidden from public
    if (course.status === 'ARCHIVED' || course.status === 'DRAFT') {
      throw new NotFoundException('Course not found');
    }

    const avgRating = course.ratings.length > 0
      ? course.ratings.reduce((sum, r) => sum + r.rating, 0) / course.ratings.length : 0;
    const { ratings, ...rest } = course;
    return { ...rest, averageRating: Math.round(avgRating * 10) / 10 };
  }

  // Enrolled users can still access ARCHIVED courses they purchased
  async getCourseByIdForEnrolled(courseId: number, userId: number) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) throw new NotFoundException('Course not found');

    // If archived, only allow access if the user is enrolled
    if (course.status === 'ARCHIVED') {
      const enrollment = await this.prisma.enrollment.findUnique({
        where: { userId_courseId: { userId, courseId } },
      });
      if (!enrollment) {
        throw new NotFoundException('Course not found');
      }
    }

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
    return this.courseRepository.delete(id);
  }

  async getCourseStudents(courseId: number, query: Record<string, any>, userId: number, userRole: string) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) throw new NotFoundException('Course not found');
    if (userRole !== 'ADMIN' && course.trainerId !== userId) throw new ForbiddenException('Access denied');

    const pagination = parsePagination(query);
    const { enrollments, total } = await this.courseRepository.getStudents(courseId, pagination.skip, pagination.limit);
    return paginatedResponse(enrollments, total, pagination.page, pagination.limit);
  }

  async uploadThumbnail(courseId: number, userId: number, userRole: string, file: Express.Multer.File) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) throw new NotFoundException('Course not found');
    if (userRole !== 'ADMIN' && course.trainerId !== userId) {
      throw new ForbiddenException('You can only update your own courses');
    }

    // Delete old thumbnail from R2 if it exists
    if (course.thumbnail) {
      await this.r2Service.deleteFile(course.thumbnail).catch(() => null);
    }

    const thumbnailUrl = await this.r2Service.uploadFile(file, 'thumbnails');
    return this.courseRepository.update(courseId, { thumbnail: thumbnailUrl });
  }
}
