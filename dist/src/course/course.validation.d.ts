import { z } from 'zod';
export declare const createCourseSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    isFree: z.ZodOptional<z.ZodBoolean>;
    thumbnail: z.ZodOptional<z.ZodString>;
    previewYoutubeUrl: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodNumber;
    status: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>>;
}, z.core.$strip>;
export declare const updateCourseSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    isFree: z.ZodOptional<z.ZodBoolean>;
    thumbnail: z.ZodOptional<z.ZodString>;
    previewYoutubeUrl: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodNumber>;
    status: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PUBLISHED: "PUBLISHED";
        ARCHIVED: "ARCHIVED";
    }>>;
}, z.core.$strip>;
export declare const courseFilterSchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    isFree: z.ZodOptional<z.ZodString>;
    minPrice: z.ZodOptional<z.ZodString>;
    maxPrice: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=course.validation.d.ts.map