import { Request, Response } from 'express';
import { wishlistService } from '../services/wishlist.service';
import { ok, notFound, conflict, badRequest, internalError } from '../utils/response';
import { getParamInt } from '../utils/params';

export const getWishlist = async (req: Request, res: Response) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.user!.id);
    return ok(res, wishlist, 'Wishlist fetched successfully');
  } catch (error) {
    console.error(error);
    return internalError(res, 'Failed to fetch wishlist');
  }
};

export const addToWishlist = async (req: Request, res: Response) => {
  try {
    const courseId = parseInt(req.body.courseId, 10);
    if (!courseId || isNaN(courseId)) return badRequest(res, 'courseId is required');
    const item = await wishlistService.addToWishlist(req.user!.id, courseId);
    return ok(res, item, 'Added to wishlist', 201);
  } catch (error: any) {
    if (error.message === 'ALREADY_IN_WISHLIST') return conflict(res, 'Course already in wishlist');
    console.error(error);
    return internalError(res, 'Failed to add to wishlist');
  }
};

export const removeFromWishlist = async (req: Request, res: Response) => {
  try {
    const courseId = getParamInt(req.params, 'courseId');
    await wishlistService.removeFromWishlist(req.user!.id, courseId);
    return ok(res, null, 'Removed from wishlist');
  } catch (error: any) {
    if (error.message === 'NOT_IN_WISHLIST') return notFound(res, 'Course not in wishlist');
    console.error(error);
    return internalError(res, 'Failed to remove from wishlist');
  }
};
