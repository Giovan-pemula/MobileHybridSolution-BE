"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseFilterSchema = exports.updateCourseSchema = exports.createCourseSchema = void 0;
const zod_1 = require("zod");
exports.createCourseSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0).optional(),
    isFree: zod_1.z.boolean().optional(),
    thumbnail: zod_1.z.string().optional(),
    previewYoutubeUrl: zod_1.z.string().optional(),
    categoryId: zod_1.z.number().int().positive('Category is required'),
    status: zod_1.z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});
exports.updateCourseSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().min(0).optional(),
    isFree: zod_1.z.boolean().optional(),
    thumbnail: zod_1.z.string().optional(),
    previewYoutubeUrl: zod_1.z.string().optional(),
    categoryId: zod_1.z.number().int().positive().optional(),
    status: zod_1.z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
});
exports.courseFilterSchema = zod_1.z.object({
    page: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional(),
    categoryId: zod_1.z.string().optional(),
    search: zod_1.z.string().optional(),
    isFree: zod_1.z.string().optional(),
    minPrice: zod_1.z.string().optional(),
    maxPrice: zod_1.z.string().optional(),
    status: zod_1.z.string().optional(),
});
//# sourceMappingURL=course.validation.js.map