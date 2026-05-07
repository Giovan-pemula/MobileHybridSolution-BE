import { z } from 'zod';

export const trainerRequestSchema = z.object({
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  experience: z.string().min(10, 'Experience must be at least 10 characters'),
});

export const verifyTrainerSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
});
