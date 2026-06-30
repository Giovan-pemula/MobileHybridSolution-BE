import { LessonService } from './lesson.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { createLessonSchema, updateLessonSchema } from './lesson.validation';
import { z } from 'zod';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    createLesson(sectionId: number, user: CurrentUserPayload, body: z.infer<typeof createLessonSchema>): Promise<{
        data: {
            order: number;
            id: number;
            title: string;
            youtubeUrl: string | null;
            duration: number | null;
            isPreview: boolean;
            sectionId: number;
        };
        message: string;
    }>;
    updateLesson(id: number, user: CurrentUserPayload, body: z.infer<typeof updateLessonSchema>): Promise<{
        data: {
            order: number;
            id: number;
            title: string;
            youtubeUrl: string | null;
            duration: number | null;
            isPreview: boolean;
            sectionId: number;
        };
        message: string;
    }>;
    deleteLesson(id: number, user: CurrentUserPayload): Promise<{
        data: {
            order: number;
            id: number;
            title: string;
            youtubeUrl: string | null;
            duration: number | null;
            isPreview: boolean;
            sectionId: number;
        };
        message: string;
    }>;
}
//# sourceMappingURL=lesson.controller.d.ts.map