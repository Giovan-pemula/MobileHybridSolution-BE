"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLessonSchema = exports.createLessonSchema = void 0;
const zod_1 = require("zod");
exports.createLessonSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    youtubeUrl: zod_1.z.string().optional(),
    duration: zod_1.z.number().int().min(0).optional(),
    isPreview: zod_1.z.boolean().optional(),
    order: zod_1.z.number().int().min(0).optional(),
});
exports.updateLessonSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    youtubeUrl: zod_1.z.string().optional(),
    duration: zod_1.z.number().int().min(0).optional(),
    isPreview: zod_1.z.boolean().optional(),
    order: zod_1.z.number().int().min(0).optional(),
});
//# sourceMappingURL=lesson.validation.js.map