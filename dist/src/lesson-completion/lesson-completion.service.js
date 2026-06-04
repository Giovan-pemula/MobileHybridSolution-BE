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
exports.LessonCompletionService = void 0;
const common_1 = require("@nestjs/common");
const lesson_completion_repository_1 = require("./lesson-completion.repository");
const gamification_service_1 = require("../gamification/gamification.service");
const prisma_service_1 = require("../common/prisma/prisma.service");
let LessonCompletionService = class LessonCompletionService {
    lessonCompletionRepository;
    gamificationService;
    prisma;
    constructor(lessonCompletionRepository, gamificationService, prisma) {
        this.lessonCompletionRepository = lessonCompletionRepository;
        this.gamificationService = gamificationService;
        this.prisma = prisma;
    }
    async toggleLessonCompletion(userId, lessonId) {
        const existing = await this.lessonCompletionRepository.findByUserAndLesson(userId, lessonId);
        const result = await this.lessonCompletionRepository.toggleCompletion(userId, lessonId);
        // If it was just newly completed (didn't exist before)
        if (!existing && result.completed) {
            // 1. Check for Daily First Mark (Streak)
            await this.gamificationService.handleDailyFirstMark(userId);
            // 2. Grant 3 XP for Lesson Complete
            await this.gamificationService.addXp(userId, 3, 'LESSON_COMPLETE');
            // 3. Check if Section Complete
            const lesson = await this.prisma.lesson.findUnique({
                where: { id: lessonId },
                include: { section: { include: { lessons: true } } },
            });
            if (lesson) {
                const sectionLessons = lesson.section.lessons.map(l => l.id);
                const completedSectionLessons = await this.prisma.lessonCompletion.count({
                    where: { userId, lessonId: { in: sectionLessons }, completed: true },
                });
                if (completedSectionLessons === sectionLessons.length) {
                    await this.gamificationService.addXp(userId, 5, 'SECTION_COMPLETE');
                    // 4. Check if Course Complete
                    const courseSections = await this.prisma.section.findMany({
                        where: { courseId: lesson.section.courseId },
                        include: { lessons: true },
                    });
                    const allCourseLessons = courseSections.flatMap(s => s.lessons.map(l => l.id));
                    const completedCourseLessons = await this.prisma.lessonCompletion.count({
                        where: { userId, lessonId: { in: allCourseLessons }, completed: true },
                    });
                    if (completedCourseLessons === allCourseLessons.length) {
                        await this.gamificationService.addXp(userId, 30, 'COURSE_COMPLETE');
                        // Also mark enrollment as completed
                        await this.prisma.enrollment.update({
                            where: { userId_courseId: { userId, courseId: lesson.section.courseId } },
                            data: { completed: true, progress: 100 },
                        });
                    }
                }
            }
        }
        return result;
    }
    async getLearningAnalytics(userId) {
        return this.lessonCompletionRepository.getLearningAnalytics(userId);
    }
};
exports.LessonCompletionService = LessonCompletionService;
exports.LessonCompletionService = LessonCompletionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lesson_completion_repository_1.LessonCompletionRepository,
        gamification_service_1.GamificationService,
        prisma_service_1.PrismaService])
], LessonCompletionService);
//# sourceMappingURL=lesson-completion.service.js.map