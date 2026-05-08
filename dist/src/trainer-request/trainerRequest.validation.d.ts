import { z } from 'zod';
export declare const trainerRequestSchema: z.ZodObject<{
    bio: z.ZodString;
    experience: z.ZodString;
}, z.core.$strip>;
export declare const verifyTrainerSchema: z.ZodObject<{
    status: z.ZodEnum<{
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=trainerRequest.validation.d.ts.map