"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionController = void 0;
const common_1 = require("@nestjs/common");
const discussion_service_1 = require("./discussion.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const discussion_validation_1 = require("../validations/discussion.validation");
const zod_1 = require("zod");
let DiscussionController = class DiscussionController {
    discussionService;
    constructor(discussionService) {
        this.discussionService = discussionService;
    }
    async getDiscussions(lessonId) {
        const discussions = await this.discussionService.getDiscussionsByLesson(lessonId);
        return { data: discussions, message: 'Discussions fetched successfully' };
    }
    async createDiscussion(lessonId, user, body) {
        const discussion = await this.discussionService.createDiscussion(lessonId, user.id, body.comment);
        return { data: discussion, message: 'Discussion created successfully' };
    }
    async createReply(id, user, body) {
        const reply = await this.discussionService.createReply(id, user.id, body.comment);
        return { data: reply, message: 'Reply created successfully' };
    }
};
exports.DiscussionController = DiscussionController;
__decorate([
    (0, common_1.Get)('lessons/:lessonId/discussions'),
    __param(0, (0, common_1.Param)('lessonId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "getDiscussions", null);
__decorate([
    (0, common_1.Post)('lessons/:lessonId/discussions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('lessonId', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(discussion_validation_1.createDiscussionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "createDiscussion", null);
__decorate([
    (0, common_1.Post)('discussions/:id/replies'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(discussion_validation_1.createReplySchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], DiscussionController.prototype, "createReply", null);
exports.DiscussionController = DiscussionController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [discussion_service_1.DiscussionService])
], DiscussionController);
//# sourceMappingURL=discussion.controller.js.map