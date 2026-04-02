import { z } from 'zod';

export const createRatingSchema = z.object({
  rating: z.number().int().min(1).max(5),
  review: z.string().optional(),
});

export const updateRatingSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  review: z.string().optional(),
});
