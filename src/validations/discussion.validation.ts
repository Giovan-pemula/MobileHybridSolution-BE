import { z } from 'zod';

export const createDiscussionSchema = z.object({
  comment: z.string().min(1, 'Comment is required'),
});

export const createReplySchema = z.object({
  comment: z.string().min(1, 'Comment is required'),
});
