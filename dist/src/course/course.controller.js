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
const swagger_1 = require("@nestjs/swagger");
const course_service_1 = require("./course.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
const zod_validation_pipe_1 = require("../common/pipes/zod-validation.pipe");
const course_validation_1 = require("./course.validation");
const multer_config_1 = require("../common/multer/multer.config");
const zod_1 = require("zod");
class CreateCourseDto {
    title;
    description;
    price;
    categoryId;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Belajar NestJS dari Nol' }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Kursus NestJS lengkap untuk pemula.' }),
    __metadata("design:type", String)
], CreateCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150000 }),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID kategori' }),
    __metadata("design:type", Number)
], CreateCourseDto.prototype, "categoryId", void 0);
class UpdateCourseDto {
    title;
    description;
    price;
    status;
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NestJS Advanced', required: false }),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Deskripsi baru.', required: false }),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200000, required: false }),
    __metadata("design:type", Number)
], UpdateCourseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'PUBLISHED', enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'], required: false }),
    __metadata("design:type", String)
], UpdateCourseDto.prototype, "status", void 0);
class UploadThumbnailDto {
    thumbnail;
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: 'string', format: 'binary', description: 'File gambar thumbnail' }),
    __metadata("design:type", Object)
], UploadThumbnailDto.prototype, "thumbnail", void 0);
let CourseController = class CourseController {
    courseService;
    constructor(courseService) {
        this.courseService = courseService;
    }
    async getCourses(query) {
        const result = await this.courseService.getAllCourses(query);
        return { data: result, message: 'Courses fetched successfully' };
    }
    async getCoursesForAdmin(query, user) {
        if (user.role === 'TRAINER')
            query = { ...query, trainerId: String(user.id) };
        const result = await this.courseService.getAllCoursesForAdmin(query);
        return { data: result, message: 'Courses fetched successfully' };
    }
    async getCourse(id, req) {
        const user = req.user;
        if (user?.id) {
            const course = await this.courseService.getCourseByIdForEnrolled(id, user.id);
            return { data: course, message: 'Course fetched successfully' };
        }
        const course = await this.courseService.getCourseById(id);
        return { data: course, message: 'Course fetched successfully' };
    }
    async createCourse(user, body) {
        const course = await this.courseService.createCourse(user.id, body);
        return { data: course, message: 'Course created successfully' };
    }
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
    (0, swagger_1.ApiOperation)({ summary: 'Ambil semua kursus publik (PUBLISHED)', description: 'Mendukung filter via query: search, categoryId, page, limit.' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Cari berdasarkan judul kursus' }),
    (0, swagger_1.ApiQuery)({ name: 'categoryId', required: false, description: 'Filter berdasarkan ID kategori' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: '1' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: '10' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar kursus berhasil diambil.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCourses", null);
__decorate([
    (0, common_1.Get)('manage'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('TRAINER', 'ADMIN'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: '[TRAINER/ADMIN] Ambil kursus untuk dikelola', description: 'TRAINER hanya melihat kursus miliknya sendiri. ADMIN melihat semua kursus.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kursus berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak.' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCoursesForAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil detail kursus berdasarkan ID', description: 'Jika pengguna sudah login & terdaftar, konten lesson akan ikut dikembalikan.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID kursus' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detail kursus berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kursus tidak ditemukan.' }),
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
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: '[TRAINER/ADMIN] Buat kursus baru' }),
    (0, swagger_1.ApiBody)({ type: CreateCourseDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Kursus berhasil dibuat.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Akses ditolak.' }),
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
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: '[TRAINER/ADMIN] Update kursus', description: 'Ubah detail kursus atau ubah status (DRAFT → PUBLISHED → ARCHIVED).' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID kursus' }),
    (0, swagger_1.ApiBody)({ type: UpdateCourseDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kursus berhasil diperbarui.' }),
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
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: '[TRAINER/ADMIN] Ambil daftar siswa dalam kursus' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID kursus' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, example: '1' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, example: '10' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar siswa berhasil diambil.' }),
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
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({ summary: '[TRAINER/ADMIN] Upload thumbnail kursus', description: 'Gunakan `multipart/form-data` dengan field bernama `thumbnail`.' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID kursus' }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({ type: UploadThumbnailDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thumbnail berhasil diupload.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "uploadThumbnail", null);
exports.CourseController = CourseController = __decorate([
    (0, swagger_1.ApiTags)('Courses'),
    (0, common_1.Controller)('courses'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
//# sourceMappingURL=course.controller.js.map