import { z } from 'zod';

export const createLessonSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  youtubeUrl: z.string().optional(),
  duration: z.number().int().min(0).optional(),
  isPreview: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});

export const updateLessonSchema = z.object({
  title: z.string().min(1).optional(),
  youtubeUrl: z.string().optional(),
  duration: z.number().int().min(0).optional(),
  isPreview: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});
