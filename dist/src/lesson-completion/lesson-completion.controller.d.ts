import { LessonCompletionService } from './lesson-completion.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class LessonCompletionController {
    private readonly lessonCompletionService;
    constructor(lessonCompletionService: LessonCompletionService);
    toggleLessonCompletion(lessonId: number, user: CurrentUserPayload): Promise<{
        data: {
            id: number;
            userId: number;
            completed: boolean;
            lessonId: number;
            completedAt: Date;
        };
        message: string;
    }>;
    getLearningAnalytics(user: CurrentUserPayload): Promise<{
        data: {
            totalLessonsCompleted: number;
            totalCoursesEnrolled: number;
            totalCoursesCompleted: number;
            dailyProgress: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").LessonCompletionGroupByOutputType, "completedAt"[]> & {
                _count: {
                    id: number;
                };
            })[];
        };
        message: string;
    }>;
}
//# sourceMappingURL=lesson-completion.controller.d.ts.map