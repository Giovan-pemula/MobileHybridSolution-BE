import { z } from 'zod';

export const trainerRequestSchema = z.object({
  cvUrl: z.string().url('CV URL must be a valid URL'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  experience: z.string().min(10, 'Experience must be at least 10 characters'),
});

export const verifyTrainerSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
});
