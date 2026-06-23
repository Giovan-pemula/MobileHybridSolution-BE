"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleMobileLoginSchema = exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1),
});
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    email: zod_1.z.string().email('Invalid email'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
exports.googleMobileLoginSchema = zod_1.z.object({
    idToken: zod_1.z.string().min(1, 'idToken is required'),
});
//# sourceMappingURL=auth.validation.js.map