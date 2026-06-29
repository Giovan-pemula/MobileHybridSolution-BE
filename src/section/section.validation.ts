import { z } from 'zod';

export const createSectionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  order: z.number().int().min(0).optional(),
});

export const updateSectionSchema = z.object({
  title: z.string().min(1).optional(),
  order: z.number().int().min(0).optional(),
});
