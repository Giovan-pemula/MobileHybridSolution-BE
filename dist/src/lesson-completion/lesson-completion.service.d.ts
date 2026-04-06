import { LessonCompletionRepository } from './lesson-completion.repository';
export declare class LessonCompletionService {
    private readonly lessonCompletionRepository;
    constructor(lessonCompletionRepository: LessonCompletionRepository);
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