import { Request, Response } from 'express';
import { courseService } from '../services/course.service';
import { ok, badRequest, notFound, forbidden, internalError } from '../utils/response';
import { createCourseSchema, updateCourseSchema } from '../validations/course.validation';
import { parsePagination } from '../utils/pagination';
import { getParamInt } from '../utils/params';
import { CourseFilters } from '../repositories/course.repository';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const pagination = parsePagination(req.query as any);
    const filters: CourseFilters = {};
    if (req.query['categoryId']) filters.categoryId = parseInt(req.query['categoryId'] as string, 10);
    if (req.query['search']) filters.search = req.query['search'] as string;
    if (req.query['isFree'] === 'true') filters.isFree = true;
    else if (req.query['isFree'] === 'false') filters.isFree = false;
    if (req.query['minPrice']) filters.minPrice = parseFloat(req.query['minPrice'] as string);
    if (req.query['maxPrice']) filters.maxPrice = parseFloat(req.query['maxPrice'] as string);
    filters.status = (req.query['status'] as string) || 'PUBLISHED';

    const result = await courseService.getAllCourses(pagination, filters);
    return ok(res, result, 'Courses fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch courses');
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    const course = await courseService.getCourseById(id);
    return ok(res, course, 'Course fetched successfully');
  } catch (error: any) {
    if (error.message === 'COURSE_NOT_FOUND') return notFound(res, 'Course not found');
    console.error(error);
    return internalError(res, 'Failed to fetch course');
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const parsed = createCourseSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const course = await courseService.createCourse(req.user!.id, parsed.data);
    return ok(res, course, 'Course created successfully', 201);
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to create course');
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    const parsed = updateCourseSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const course = await courseService.updateCourse(id, req.user!.id, req.user!.role, parsed.data);
    return ok(res, course, 'Course updated successfully');
  } catch (error: any) {
    if (error.message === 'COURSE_NOT_FOUND') return notFound(res, 'Course not found');
    if (error.message === 'FORBIDDEN') return forbidden(res, 'You can only edit your own courses');
    console.error(error);
    return internalError(res, 'Failed to update course');
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    await courseService.deleteCourse(id, req.user!.id, req.user!.role);
    return ok(res, null, 'Course deleted successfully');
  } catch (error: any) {
    if (error.message === 'COURSE_NOT_FOUND') return notFound(res, 'Course not found');
    if (error.message === 'FORBIDDEN') return forbidden(res, 'You can only delete your own courses');
    console.error(error);
    return internalError(res, 'Failed to delete course');
  }
};

export const getCourseStudents = async (req: Request, res: Response) => {
  try {
    const courseId = getParamInt(req.params, 'courseId');
    const pagination = parsePagination(req.query as any);
    const result = await courseService.getCourseStudents(courseId, pagination, req.user!.id, req.user!.role);
    return ok(res, result, 'Students fetched successfully');
  } catch (error: any) {
    if (error.message === 'COURSE_NOT_FOUND') return notFound(res, 'Course not found');
    if (error.message === 'FORBIDDEN') return forbidden(res, 'Access denied');
    console.error(error);
    return internalError(res, 'Failed to fetch students');
  }
};
