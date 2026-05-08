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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollmentService = void 0;
const common_1 = require("@nestjs/common");
const enrollment_repository_1 = require("./enrollment.repository");
const course_repository_1 = require("../course/course.repository");
const prisma_service_1 = require("../common/prisma/prisma.service");
let EnrollmentService = class EnrollmentService {
    enrollmentRepository;
    courseRepository;
    prisma;
    constructor(enrollmentRepository, courseRepository, prisma) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.prisma = prisma;
    }
    async getMyCourses(userId) {
        const enrollments = await this.enrollmentRepository.findByUser(userId);
        return Promise.all(enrollments.map(async (enrollment) => {
            const totalLessons = await this.prisma.lesson.count({
                where: { section: { courseId: enrollment.courseId } },
            });
            const completedLessons = await this.prisma.lessonCompletion.count({
                where: { userId, lesson: { section: { courseId: enrollment.courseId } }, completed: true },
            });
            const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
            const completed = totalLessons > 0 && completedLessons === totalLessons;
            return { ...enrollment, progress, completed, totalLessons, completedLessons };
        }));
    }
    async enrollInCourse(userId, courseId) {
        const course = await this.courseRepository.findById(courseId);
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        // Paid courses must go through the order flow — direct enroll is not allowed
        if (!course.isFree) {
            throw new common_1.ForbiddenException('This course requires purchase. Please use POST /orders to buy and enroll.');
        }
        const existing = await this.enrollmentRepository.findByUserAndCourse(userId, courseId);
        if (existing)
            throw new common_1.ConflictException('Already enrolled in this course');
        return this.enrollmentRepository.create(userId, courseId);
    }
};
exports.EnrollmentService = EnrollmentService;
exports.EnrollmentService = EnrollmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [enrollment_repository_1.EnrollmentRepository,
        course_repository_1.CourseRepository,
        prisma_service_1.PrismaService])
], EnrollmentService);
//# sourceMappingURL=enrollment.service.js.map