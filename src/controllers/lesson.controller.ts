import { Request, Response } from 'express';
import { lessonService } from '../services/lesson.service';
import { ok, badRequest, notFound, forbidden, internalError } from '../utils/response';
import { createLessonSchema, updateLessonSchema } from '../validations/lesson.validation';
import { getParamInt } from '../utils/params';

export const createLesson = async (req: Request, res: Response) => {
  try {
    const sectionId = getParamInt(req.params, 'sectionId');
    const parsed = createLessonSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const lesson = await lessonService.createLesson(sectionId, req.user!.id, req.user!.role, parsed.data);
    return ok(res, lesson, 'Lesson created successfully', 201);
  } catch (error: any) {
    if (error.message === 'SECTION_NOT_FOUND') return notFound(res, 'Section not found');
    if (error.message === 'FORBIDDEN') return forbidden(res, 'Access denied');
    console.error(error);
    return internalError(res, 'Failed to create lesson');
  }
};

export const updateLesson = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    const parsed = updateLessonSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const lesson = await lessonService.updateLesson(id, req.user!.id, req.user!.role, parsed.data);
    return ok(res, lesson, 'Lesson updated successfully');
  } catch (error: any) {
    if (error.message === 'LESSON_NOT_FOUND') return notFound(res, 'Lesson not found');
    if (error.message === 'FORBIDDEN') return forbidden(res, 'Access denied');
    console.error(error);
    return internalError(res, 'Failed to update lesson');
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    await lessonService.deleteLesson(id, req.user!.id, req.user!.role);
    return ok(res, null, 'Lesson deleted successfully');
  } catch (error: any) {
    if (error.message === 'LESSON_NOT_FOUND') return notFound(res, 'Lesson not found');
    if (error.message === 'FORBIDDEN') return forbidden(res, 'Access denied');
    console.error(error);
    return internalError(res, 'Failed to delete lesson');
  }
};
