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
exports.LessonCompletionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
let LessonCompletionRepository = class LessonCompletionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUserAndLesson(userId, lessonId) {
        return this.prisma.lessonCompletion.findUnique({
            where: { userId_lessonId: { userId, lessonId } },
        });
    }
    async toggleCompletion(userId, lessonId) {
        const existing = await this.findByUserAndLesson(userId, lessonId);
        if (existing) {
            return this.prisma.lessonCompletion.update({
                where: { userId_lessonId: { userId, lessonId } },
                data: {
                    completed: !existing.completed,
                    completedAt: !existing.completed ? new Date() : existing.completedAt,
                },
            });
        }
        return this.prisma.lessonCompletion.create({
            data: { userId, lessonId, completed: true },
        });
    }
    async getLearningAnalytics(userId) {
        const totalCompleted = await this.prisma.lessonCompletion.count({ where: { userId, completed: true } });
        const totalEnrolled = await this.prisma.enrollment.count({ where: { userId } });
        const completedCourses = await this.prisma.enrollment.count({ where: { userId, completed: true } });
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const dailyCompletions = await this.prisma.lessonCompletion.groupBy({
            by: ['completedAt'],
            where: { userId, completed: true, completedAt: { gte: thirtyDaysAgo } },
            _count: { id: true },
        });
        return {
            totalLessonsCompleted: totalCompleted,
            totalCoursesEnrolled: totalEnrolled,
            totalCoursesCompleted: completedCourses,
            dailyProgress: dailyCompletions,
        };
    }
};
exports.LessonCompletionRepository = LessonCompletionRepository;
exports.LessonCompletionRepository = LessonCompletionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonCompletionRepository);
//# sourceMappingURL=lesson-completion.repository.js.map