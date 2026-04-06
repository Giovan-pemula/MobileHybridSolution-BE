"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    courseIds: zod_1.z.array(zod_1.z.number().int().positive()).min(1, 'At least one course is required'),
});
//# sourceMappingURL=order.validation.js.map