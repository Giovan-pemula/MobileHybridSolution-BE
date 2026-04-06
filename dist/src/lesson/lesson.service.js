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
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const lesson_repository_1 = require("./lesson.repository");
const section_repository_1 = require("../section/section.repository");
let LessonService = class LessonService {
    lessonRepository;
    sectionRepository;
    constructor(lessonRepository, sectionRepository) {
        this.lessonRepository = lessonRepository;
        this.sectionRepository = sectionRepository;
    }
    async createLesson(sectionId, userId, userRole, data) {
        const section = await this.sectionRepository.findById(sectionId);
        if (!section)
            throw new common_1.NotFoundException('Section not found');
        if (userRole !== 'ADMIN' && section.course.trainerId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return this.lessonRepository.create({ ...data, sectionId });
    }
    async updateLesson(id, userId, userRole, data) {
        const lesson = await this.lessonRepository.findById(id);
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        if (userRole !== 'ADMIN' && lesson.section.course.trainerId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        return this.lessonRepository.update(id, data);
    }
    async deleteLesson(id, userId, userRole) {
        const lesson = await this.lessonRepository.findById(id);
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        if (userRole !== 'ADMIN' && lesson.section.course.trainerId !== userId)
            throw new common_1.ForbiddenException('Access denied');
        await this.lessonRepository.delete(id);
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lesson_repository_1.LessonRepository,
        section_repository_1.SectionRepository])
], LessonService);
//# sourceMappingURL=lesson.service.js.map