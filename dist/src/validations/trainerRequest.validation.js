"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTrainerSchema = exports.trainerRequestSchema = void 0;
const zod_1 = require("zod");
exports.trainerRequestSchema = zod_1.z.object({
    cvUrl: zod_1.z.string().url('CV URL must be a valid URL'),
    bio: zod_1.z.string().min(10, 'Bio must be at least 10 characters'),
    experience: zod_1.z.string().min(10, 'Experience must be at least 10 characters'),
});
exports.verifyTrainerSchema = zod_1.z.object({
    status: zod_1.z.enum(['APPROVED', 'REJECTED']),
});
//# sourceMappingURL=trainerRequest.validation.js.map