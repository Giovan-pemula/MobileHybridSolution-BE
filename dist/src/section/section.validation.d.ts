import { z } from 'zod';
export declare const createSectionSchema: z.ZodObject<{
    title: z.ZodString;
    order: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateSectionSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    order: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=section.validation.d.ts.map