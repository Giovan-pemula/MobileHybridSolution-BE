"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReplySchema = exports.createDiscussionSchema = void 0;
const zod_1 = require("zod");
exports.createDiscussionSchema = zod_1.z.object({
    comment: zod_1.z.string().min(1, 'Comment is required'),
});
exports.createReplySchema = zod_1.z.object({
    comment: zod_1.z.string().min(1, 'Comment is required'),
});
//# sourceMappingURL=discussion.validation.js.map