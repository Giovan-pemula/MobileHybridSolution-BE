import { Request, Response } from 'express';
import { lessonCompletionService } from '../services/lessonCompletion.service';
import { ok, badRequest, internalError } from '../utils/response';
import { getParamInt } from '../utils/params';

export const toggleLessonCompletion = async (req: Request, res: Response) => {
  try {
    const lessonId = getParamInt(req.params, 'lessonId');
    if (isNaN(lessonId)) return badRequest(res, 'Invalid lesson ID');
    const result = await lessonCompletionService.toggleLessonCompletion(req.user!.id, lessonId);
    const message = result.completed ? 'Lesson marked as completed' : 'Lesson marked as incomplete';
    return ok(res, result, message);
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to update lesson completion');
  }
};

export const getLearningAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await lessonCompletionService.getLearningAnalytics(req.user!.id);
    return ok(res, analytics, 'Learning analytics fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch analytics');
  }
};
