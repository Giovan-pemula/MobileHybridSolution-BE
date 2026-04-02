import { Request, Response } from 'express';
import { enrollmentService } from '../services/enrollment.service';
import { ok, notFound, conflict, internalError } from '../utils/response';
import { getParamInt } from '../utils/params';

export const getMyCourses = async (req: Request, res: Response) => {
  try {
    const courses = await enrollmentService.getMyCourses(req.user!.id);
    return ok(res, courses, 'My courses fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch courses');
  }
};

export const enrollInCourse = async (req: Request, res: Response) => {
  try {
    const courseId = getParamInt(req.params, 'courseId');
    const enrollment = await enrollmentService.enrollInCourse(req.user!.id, courseId);
    return ok(res, enrollment, 'Enrolled successfully', 201);
  } catch (error: any) {
    if (error.message === 'COURSE_NOT_FOUND') return notFound(res, 'Course not found');
    if (error.message === 'ALREADY_ENROLLED') return conflict(res, 'Already enrolled in this course');
    console.error(error);
    return internalError(res, 'Failed to enroll');
  }
};
