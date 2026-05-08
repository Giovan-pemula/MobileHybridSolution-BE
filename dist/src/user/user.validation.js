"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
// Used for authenticated users updating their own profile — email not changeable
exports.updateProfileSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
});
// Used by ADMIN to update any user (can also update email)
exports.updateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    email: zod_1.z.string().email().optional(),
    avatar: zod_1.z.string().url().optional(),
});
//# sourceMappingURL=user.validation.js.map