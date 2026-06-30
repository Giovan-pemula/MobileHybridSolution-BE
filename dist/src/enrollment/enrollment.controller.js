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
exports.EnrollmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enrollment_service_1 = require("./enrollment.service");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const current_user_decorator_1 = require("../common/decorators/current-user.decorator");
let EnrollmentController = class EnrollmentController {
    enrollmentService;
    constructor(enrollmentService) {
        this.enrollmentService = enrollmentService;
    }
    async getMyCourses(user) {
        const courses = await this.enrollmentService.getMyCourses(user.id);
        return { data: courses, message: 'My courses fetched successfully' };
    }
    async enrollInCourse(courseId, user) {
        const enrollment = await this.enrollmentService.enrollInCourse(user.id, courseId);
        return { data: enrollment, message: 'Enrolled successfully' };
    }
};
exports.EnrollmentController = EnrollmentController;
__decorate([
    (0, common_1.Get)('my-courses'),
    (0, swagger_1.ApiOperation)({ summary: 'Ambil semua kursus yang sudah diikuti oleh pengguna yang login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Daftar kursus berhasil diambil.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token tidak valid.' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "getMyCourses", null);
__decorate([
    (0, common_1.Post)('courses/:courseId/enroll'),
    (0, swagger_1.ApiOperation)({ summary: 'Daftar ke kursus gratis', description: 'Hanya berlaku untuk kursus dengan harga 0. Untuk kursus berbayar, gunakan endpoint Orders.' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', description: 'ID kursus yang ingin didaftarkan' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Berhasil mendaftar ke kursus.' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Pengguna sudah terdaftar di kursus ini.' }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "enrollInCourse", null);
exports.EnrollmentController = EnrollmentController = __decorate([
    (0, swagger_1.ApiTags)('Enrollments'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [enrollment_service_1.EnrollmentService])
], EnrollmentController);
//# sourceMappingURL=enrollment.controller.js.map