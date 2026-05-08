import { z } from 'zod';
export declare const createRatingSchema: z.ZodObject<{
    rating: z.ZodNumber;
    review: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateRatingSchema: z.ZodObject<{
    rating: z.ZodOptional<z.ZodNumber>;
    review: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=rating.validation.d.ts.map