import { z } from 'zod';
export declare const createLessonSchema: z.ZodObject<{
    title: z.ZodString;
    youtubeUrl: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
    isPreview: z.ZodOptional<z.ZodBoolean>;
    order: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateLessonSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    youtubeUrl: z.ZodOptional<z.ZodString>;
    duration: z.ZodOptional<z.ZodNumber>;
    isPreview: z.ZodOptional<z.ZodBoolean>;
    order: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
//# sourceMappingURL=lesson.validation.d.ts.map