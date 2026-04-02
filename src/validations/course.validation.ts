import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  isFree: z.boolean().optional(),
  thumbnail: z.string().optional(),
  previewYoutubeUrl: z.string().optional(),
  categoryId: z.number().int().positive('Category is required'),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export const updateCourseSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  price: z.number().min(0).optional(),
  isFree: z.boolean().optional(),
  thumbnail: z.string().optional(),
  previewYoutubeUrl: z.string().optional(),
  categoryId: z.number().int().positive().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']).optional(),
});

export const courseFilterSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  categoryId: z.string().optional(),
  search: z.string().optional(),
  isFree: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  status: z.string().optional(),
});
