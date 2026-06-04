import { LessonCompletionRepository } from './lesson-completion.repository';
import { GamificationService } from '../gamification/gamification.service';
import { PrismaService } from '../common/prisma/prisma.service';
export declare class LessonCompletionService {
    private readonly lessonCompletionRepository;
    private readonly gamificationService;
    private readonly prisma;
    constructor(lessonCompletionRepository: LessonCompletionRepository, gamificationService: GamificationService, prisma: PrismaService);
    toggleLessonCompletion(userId: number, lessonId: number): Promise<{
        id: number;
        userId: number;
        completed: boolean;
        lessonId: number;
        completedAt: Date;
    }>;
    getLearningAnalytics(userId: number): Promise<{
        totalLessonsCompleted: number;
        totalCoursesEnrolled: number;
        totalCoursesCompleted: number;
        dailyProgress: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").LessonCompletionGroupByOutputType, "completedAt"[]> & {
            _count: {
                id: number;
            };
        })[];
    }>;
}
//# sourceMappingURL=lesson-completion.service.d.ts.map