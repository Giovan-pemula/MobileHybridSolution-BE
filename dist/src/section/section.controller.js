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
exports.SectionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const section_service_1 = require("./section.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const section_validation_1 = require("./section.validation");
const zod_1 = require("zod");
class CreateSectionDto {
    title;
    order;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pengenalan NestJS' }),
    __metadata("design:type", String)
], CreateSectionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: false }),
    __metadata("design:type", Number)
], CreateSectionDto.prototype, "order", void 0);
class UpdateSectionDto {
    title;
    order;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NestJS Lanjutan', required: false }),
    __metadata("design:type", String)
], UpdateSectionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, required: false }),
    __metadata("design:type", Number)
], UpdateSectionDto.prototype, "order", void 0);
let SectionController = class SectionController {
    sectionService;
    constructor(sectionService) {
        this.sectionService = sectionService;
    }
    async getSections(courseId) {
        const sections = await this.sectionService.getSectionsByCourse(courseId);
        return { data: sections, message: 'Sections fetched successfully' };
    }
    async createSection(courseId, user, body) {
        const section = await this.sectionService.createSection(courseId, user.id, user.role, body);
        return { data: section, message: 'Section created successfully' };
    }
    async updateSection(id, user, body) {
        const section = await this.sectionService.updateSection(id, user.id, user.role, body);
        return { data: section, message: 'Section updated successfully' };
    }
    async deleteSection(id, user) {
        const deleted = await this.sectionService.deleteSection(id, user.id, user.role);
        return { data: deleted, message: `Section "${deleted.title}" deleted successfully` };
    }
};
exports.SectionController = SectionController;
__decorate([
    (0, common_1.Get)('courses/:courseId/sections'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil semua section dari sebuah kursus' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID kursus' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Sections berhasil diambil.' }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getSections", null);
__decorate([
    (0, common_1.Post)('courses/:courseId/sections'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('TRAINER', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: '[TRAINER/ADMIN] Buat section baru di dalam kursus' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID kursus' }),
    (0, swagger_1.ApiBody)({ type: CreateSectionDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Section berhasil dibuat.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak.' }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(section_validation_1.createSectionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "createSection", null);
__decorate([
    (0, common_1.Patch)('sections/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('TRAINER', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: '[TRAINER/ADMIN] Update section' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID section' }),
    (0, swagger_1.ApiBody)({ type: UpdateSectionDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Section berhasil diperbarui.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(section_validation_1.updateSectionSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "updateSection", null);
__decorate([
    (0, common_1.Delete)('sections/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('TRAINER', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: '[TRAINER/ADMIN] Hapus section' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID section' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Section berhasil dihapus.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "deleteSection", null);
exports.SectionController = SectionController = __decorate([
    (0, swagger_1.ApiTags)('Sections'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [section_service_1.SectionService])
], SectionController);
//# sourceMappingURL=section.controller.js.map