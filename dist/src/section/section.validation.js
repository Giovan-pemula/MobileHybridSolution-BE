"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSectionSchema = exports.createSectionSchema = void 0;
const zod_1 = require("zod");
exports.createSectionSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, 'Title is required'),
    order: zod_1.z.number().int().min(0).optional(),
});
exports.updateSectionSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).optional(),
    order: zod_1.z.number().int().min(0).optional(),
});
//# sourceMappingURL=section.validation.js.map