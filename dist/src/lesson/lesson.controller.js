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
exports.LessonController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const lesson_service_1 = require("./lesson.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const lesson_validation_1 = require("./lesson.validation");
const zod_1 = require("zod");
class CreateLessonDto {
    title;
    videoUrl;
    content;
    order;
    duration;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Apa itu NestJS?' }),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://youtube.com/...', required: false }),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Teks materi...', required: false }),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 300, description: 'Durasi dalam detik', required: false }),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "duration", void 0);
class UpdateLessonDto {
    title;
    videoUrl;
    content;
    order;
    duration;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NestJS Module System', required: false }),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UpdateLessonDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UpdateLessonDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UpdateLessonDto.prototype, "duration", void 0);
let LessonController = class LessonController {
    lessonService;
    constructor(lessonService) {
        this.lessonService = lessonService;
    }
    async createLesson(sectionId, user, body) {
        const lesson = await this.lessonService.createLesson(sectionId, user.id, user.role, body);
        return { data: lesson, message: 'Lesson created successfully' };
    }
    async updateLesson(id, user, body) {
        const lesson = await this.lessonService.updateLesson(id, user.id, user.role, body);
        return { data: lesson, message: 'Lesson updated successfully' };
    }
    async deleteLesson(id, user) {
        const deleted = await this.lessonService.deleteLesson(id, user.id, user.role);
        return { data: deleted, message: `Lesson "${deleted.title}" deleted successfully` };
    }
};
exports.LessonController = LessonController;
__decorate([
    (0, common_1.Post)('sections/:sectionId/lessons'),
    (0, swagger_1.ApiOperation)({ summary: '[TRAINER/ADMIN] Buat lesson baru di dalam section' }),
    (0, swagger_1.ApiParam)({ name: 'sectionId', description: 'ID section' }),
    (0, swagger_1.ApiBody)({ type: CreateLessonDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Lesson berhasil dibuat.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak.' }),
    __param(0, (0, common_1.Param)('sectionId', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(lesson_validation_1.createLessonSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "createLesson", null);
__decorate([
    (0, common_1.Patch)('lessons/:id'),
    (0, swagger_1.ApiOperation)({ summary: '[TRAINER/ADMIN] Update lesson' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID lesson' }),
    (0, swagger_1.ApiBody)({ type: UpdateLessonDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson berhasil diperbarui.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(lesson_validation_1.updateLessonSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "updateLesson", null);
__decorate([
    (0, common_1.Delete)('lessons/:id'),
    (0, swagger_1.ApiOperation)({ summary: '[TRAINER/ADMIN] Hapus lesson' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID lesson' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lesson berhasil dihapus.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], LessonController.prototype, "deleteLesson", null);
exports.LessonController = LessonController = __decorate([
    (0, swagger_1.ApiTags)('Lessons'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('TRAINER', 'ADMIN'),
    __metadata("design:paramtypes", [lesson_service_1.LessonService])
], LessonController);
//# sourceMappingURL=lesson.controller.js.map