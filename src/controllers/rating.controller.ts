import { Request, Response } from 'express';
import { ratingService } from '../services/rating.service';
import { ok, badRequest, notFound, forbidden, conflict, internalError } from '../utils/response';
import { createRatingSchema, updateRatingSchema } from '../validations/rating.validation';
import { getParamInt } from '../utils/params';

export const getCourseRatings = async (req: Request, res: Response) => {
  try {
    const courseId = getParamInt(req.params, 'courseId');
    const ratings = await ratingService.getCourseRatings(courseId);
    return ok(res, ratings, 'Ratings fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch ratings');
  }
};

export const createRating = async (req: Request, res: Response) => {
  try {
    const courseId = getParamInt(req.params, 'courseId');
    const parsed = createRatingSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const rating = await ratingService.createRating(req.user!.id, courseId, parsed.data);
    return ok(res, rating, 'Rating created successfully', 201);
  } catch (error: any) {
    if (error.message === 'ALREADY_RATED') return conflict(res, 'You have already rated this course');
    console.error(error);
    return internalError(res, 'Failed to create rating');
  }
};

export const updateRating = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    const parsed = updateRatingSchema.safeParse(req.body);
    if (!parsed.success) return badRequest(res, 'Invalid input', parsed.error.format());
    const rating = await ratingService.updateRating(id, req.user!.id, parsed.data);
    return ok(res, rating, 'Rating updated successfully');
  } catch (error: any) {
    if (error.message === 'RATING_NOT_FOUND') return notFound(res, 'Rating not found');
    if (error.message === 'FORBIDDEN') return forbidden(res, 'You can only edit your own rating');
    console.error(error);
    return internalError(res, 'Failed to update rating');
  }
};

export const deleteRating = async (req: Request, res: Response) => {
  try {
    const id = getParamInt(req.params, 'id');
    await ratingService.deleteRating(id, req.user!.id);
    return ok(res, null, 'Rating deleted successfully');
  } catch (error: any) {
    if (error.message === 'RATING_NOT_FOUND') return notFound(res, 'Rating not found');
    if (error.message === 'FORBIDDEN') return forbidden(res, 'You can only delete your own rating');
    console.error(error);
    return internalError(res, 'Failed to delete rating');
  }
};
