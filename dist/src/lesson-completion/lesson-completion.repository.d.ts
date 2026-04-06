import { PrismaService } from '../common/prisma/prisma.service';
export declare class LessonCompletionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUserAndLesson(userId: number, lessonId: number): Promise<{
        id: number;
        userId: number;
        completed: boolean;
        lessonId: number;
        completedAt: Date;
    } | null>;
    toggleCompletion(userId: number, lessonId: number): Promise<{
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
//# sourceMappingURL=lesson-completion.repository.d.ts.map