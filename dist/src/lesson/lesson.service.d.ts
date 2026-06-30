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
        order: number;
        id: number;
        title: string;
        duration: number | null;
        youtubeUrl: string | null;
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
        order: number;
        id: number;
        title: string;
        duration: number | null;
        youtubeUrl: string | null;
        isPreview: boolean;
        sectionId: number;
    }>;
    deleteLesson(id: number, userId: number, userRole: string): Promise<{
        order: number;
        id: number;
        title: string;
        duration: number | null;
        youtubeUrl: string | null;
        isPreview: boolean;
        sectionId: number;
    }>;
}
//# sourceMappingURL=lesson.service.d.ts.map