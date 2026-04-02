import { Request, Response } from 'express';
import { discussionService } from '../services/discussion.service';
import { ok, badRequest, notFound, internalError } from '../utils/response';
import { createDiscussionSchema, createReplySchema } from '../validations/discussion.validation';
import { getParamInt } from '../utils/params';

export const getDiscussions = async (req: Request, res: Response) => {
  try {
    const lessonId = getParamInt(req.params, 'lessonId');
    const discussions = await discussionService.getDiscussionsByLesson(lessonId);
    return ok(res, discussions, 'Discussions fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch discussions');
  }
};

export const createDiscussion = async (req: Request, res: Response) => {
  try {
    const lessonId = getParamInt(req.params, 'lessonId');
    const parsed = createDiscussionSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const discussion = await discussionService.createDiscussion(lessonId, req.user!.id, parsed.data.comment);
    return ok(res, discussion, 'Discussion created successfully', 201);
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to create discussion');
  }
};

export const createReply = async (req: Request, res: Response) => {
  try {
    const discussionId = getParamInt(req.params, 'id');
    const parsed = createReplySchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const reply = await discussionService.createReply(discussionId, req.user!.id, parsed.data.comment);
    return ok(res, reply, 'Reply created successfully', 201);
  } catch (error: any) {
    if (error.message === 'DISCUSSION_NOT_FOUND') return notFound(res, 'Discussion not found');
    console.error(error);
    return internalError(res, 'Failed to create reply');
  }
};
