import { LessonRepository } from './lesson.repository';
import { SectionRepository } from '../section/section.repository';
export declare class LessonService {
    private readonly lessonRepository;
    private readonly sectionRepository;
    constructor(lessonRepository: LessonRepository, sectionRepository: SectionRepository);
    createLesson(sectionId: number, userId: number, userRole: string, data: {
        title: string;
        youtubeUrl?: string;
        duration?: number;
        isPreview?: boolean;
        order?: number;
    }): Promise<{
        id: number;
        title: string;
        order: number;
        youtubeUrl: string | null;
        duration: number | null;
        isPreview: boolean;
        sectionId: number;
    }>;
    updateLesson(id: number, userId: number, userRole: string, data: {
        title?: string;
        youtubeUrl?: string;
        duration?: number;
        isPreview?: boolean;
        order?: number;
    }): Promise<{
        id: number;
        title: string;
        order: number;
        youtubeUrl: string | null;
        duration: number | null;
        isPreview: boolean;
        sectionId: number;
    }>;
    deleteLesson(id: number, userId: number, userRole: string): Promise<{
        id: number;
        title: string;
        order: number;
        youtubeUrl: string | null;
        duration: number | null;
        isPreview: boolean;
        sectionId: number;
    }>;
}
//# sourceMappingURL=lesson.service.d.ts.map