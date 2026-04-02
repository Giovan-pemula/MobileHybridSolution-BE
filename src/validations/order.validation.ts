import { z } from 'zod';

export const createOrderSchema = z.object({
  courseIds: z.array(z.number().int().positive()).min(1, 'At least one course is required'),
});
