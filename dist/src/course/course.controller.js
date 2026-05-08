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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const course_service_1 = require("./course.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const course_validation_1 = require("./course.validation");
const multer_config_1 = require("../common/multer/multer.config");
const zod_1 = require("zod");
let CourseController = class CourseController {
    courseService;
    constructor(courseService) {
        this.courseService = courseService;
    }
    // ─── Public Catalog (PUBLISHED only, ARCHIVED never shown) ────────────────
    async getCourses(query) {
        const result = await this.courseService.getAllCourses(query);
        return { data: result, message: 'Courses fetched successfully' };
    }
    // ─── Trainer / Admin — see all statuses (DRAFT, PUBLISHED, ARCHIVED) ──────
    async getCoursesForAdmin(query, user) {
        // Trainer only sees their own courses; Admin sees all
        if (user.role === 'TRAINER')
            query = { ...query, trainerId: String(user.id) };
        const result = await this.courseService.getAllCoursesForAdmin(query);
        return { data: result, message: 'Courses fetched successfully' };
    }
    // ─── Course Detail ─────────────────────────────────────────────────────────
    // Logged-in enrolled users can still view ARCHIVED courses they purchased.
    // Guests or non-enrolled users get 404 for ARCHIVED courses.
    async getCourse(id, req) {
        const user = req.user;
        if (user?.id) {
            const course = await this.courseService.getCourseByIdForEnrolled(id, user.id);
            return { data: course, message: 'Course fetched successfully' };
        }
        const course = await this.courseService.getCourseById(id);
        return { data: course, message: 'Course fetched successfully' };
    }
    // ─── Mutations ─────────────────────────────────────────────────────────────
    async createCourse(user, body) {
        const course = await this.courseService.createCourse(user.id, body);
        return { data: course, message: 'Course created successfully' };
    }
    // To archive a course: PATCH /courses/:id with { "status": "ARCHIVED" }
    async updateCourse(id, user, body) {
        const course = await this.courseService.updateCourse(id, user.id, user.role, body);
        const statusMsg = body.status === 'ARCHIVED' ? 'archived' : 'updated';
        return { data: course, message: `Course "${course.title}" ${statusMsg} successfully` };
    }
    async getCourseStudents(courseId, query, user) {
        const result = await this.courseService.getCourseStudents(courseId, query, user.id, user.role);
        return { data: result, message: 'Students fetched successfully' };
    }
    async uploadThumbnail(id, user, file) {
        const course = await this.courseService.uploadThumbnail(id, user.id, user.role, file);
        return { data: course, message: 'Thumbnail uploaded successfully' };
    }
};
exports.CourseController = CourseController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourses", null);
__decorate([
    (0, common_1.Get)('manage'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('TRAINER', 'ADMIN'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCoursesForAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourse", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('TRAINER', 'ADMIN'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(course_validation_1.createCourseSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "createCourse", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('TRAINER', 'ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Body)(new zod_validation_pipe_1.ZodValidationPipe(course_validation_1.updateCourseSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "updateCourse", null);
__decorate([
    (0, common_1.Get)(':courseId/students'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('TRAINER', 'ADMIN'),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourseStudents", null);
__decorate([
    (0, common_1.Patch)(':id/thumbnail'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('TRAINER', 'ADMIN'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('thumbnail', (0, multer_config_1.imageUploadOptions)())),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "uploadThumbnail", null);
exports.CourseController = CourseController = __decorate([
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map