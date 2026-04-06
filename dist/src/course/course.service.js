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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const course_repository_1 = require("./course.repository");
const pagination_1 = require("../utils/pagination");
let CourseService = class CourseService {
    courseRepository;
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async getAllCourses(query) {
        const pagination = (0, pagination_1.parsePagination)(query);
        const filters = {};
        if (query['categoryId'])
            filters.categoryId = parseInt(query['categoryId'], 10);
        if (query['search'])
            filters.search = query['search'];
        if (query['isFree'] === 'true')
            filters.isFree = true;
        else if (query['isFree'] === 'false')
            filters.isFree = false;
        if (query['minPrice'])
            filters.minPrice = parseFloat(query['minPrice']);
        if (query['maxPrice'])
            filters.maxPrice = parseFloat(query['maxPrice']);
        filters.status = query['status'] || 'PUBLISHED';
        const { courses, total } = await this.courseRepository.findAll(pagination.skip, pagination.limit, filters);
        return (0, pagination_1.paginatedResponse)(courses, total, pagination.page, pagination.limit);
    }
    async getCourseById(id) {
        const course = await this.courseRepository.findById(id);
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        const avgRating = course.ratings.length > 0
            ? course.ratings.reduce((sum, r) => sum + r.rating, 0) / course.ratings.length : 0;
        const { ratings, ...rest } = course;
        return { ...rest, averageRating: Math.round(avgRating * 10) / 10 };
    }
    async createCourse(trainerId, data) {
        return this.courseRepository.create({ ...data, trainerId });
    }
    async updateCourse(id, userId, userRole, data) {
        const course = await this.courseRepository.findById(id);
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (userRole !== 'ADMIN' && course.trainerId !== userId)
            throw new common_1.ForbiddenException('You can only edit your own courses');
        return this.courseRepository.update(id, data);
    }
    async deleteCourse(id, userId, userRole) {
        const course = await this.courseRepository.findById(id);
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (userRole !== 'ADMIN' && course.trainerId !== userId)
            throw new common_1.ForbiddenException('You can only delete your own courses');
        await this.courseRepository.delete(id);
    }
    async getCourseStudents(courseId, query, userId, userRole) {
        const course = await this.courseRepository.findById(courseId);
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (userRole !== 'ADMIN' && course.trainerId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        const pagination = (0, pagination_1.parsePagination)(query);
        const { enrollments, total } = await this.courseRepository.getStudents(courseId, pagination.skip, pagination.limit);
        return (0, pagination_1.paginatedResponse)(enrollments, total, pagination.page, pagination.limit);
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [course_repository_1.CourseRepository])
], CourseService);
//# sourceMappingURL=course.service.js.map