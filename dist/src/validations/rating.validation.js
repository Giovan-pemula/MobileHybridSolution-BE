"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRatingSchema = exports.createRatingSchema = void 0;
const zod_1 = require("zod");
exports.createRatingSchema = zod_1.z.object({
    rating: zod_1.z.number().int().min(1).max(5),
    review: zod_1.z.string().optional(),
});
exports.updateRatingSchema = zod_1.z.object({
    rating: zod_1.z.number().int().min(1).max(5).optional(),
    review: zod_1.z.string().optional(),
});
//# sourceMappingURL=rating.validation.js.map