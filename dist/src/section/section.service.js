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
exports.SectionService = void 0;
const common_1 = require("@nestjs/common");
const section_repository_1 = require("./section.repository");
const course_repository_1 = require("../course/course.repository");
let SectionService = class SectionService {
    sectionRepository;
    courseRepository;
    constructor(sectionRepository, courseRepository) {
        this.sectionRepository = sectionRepository;
        this.courseRepository = courseRepository;
    }
    async getSectionsByCourse(courseId) {
        return this.sectionRepository.findByCourseId(courseId);
    }
    async createSection(courseId, userId, userRole, data) {
        const course = await this.courseRepository.findById(courseId);
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (userRole !== 'ADMIN' && course.trainerId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return this.sectionRepository.create({ ...data, courseId });
    }
    async updateSection(id, userId, userRole, data) {
        const section = await this.sectionRepository.findById(id);
        if (!section)
            throw new common_1.NotFoundException('Section not found');
        if (userRole !== 'ADMIN' && section.course.trainerId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return this.sectionRepository.update(id, data);
    }
    async deleteSection(id, userId, userRole) {
        const section = await this.sectionRepository.findById(id);
        if (!section)
            throw new common_1.NotFoundException('Section not found');
        if (userRole !== 'ADMIN' && section.course.trainerId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return this.sectionRepository.delete(id);
    }
};
exports.SectionService = SectionService;
exports.SectionService = SectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [section_repository_1.SectionRepository,
        course_repository_1.CourseRepository])
], SectionService);
//# sourceMappingURL=section.service.js.map