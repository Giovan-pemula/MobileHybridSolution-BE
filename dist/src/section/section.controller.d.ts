import { SectionService } from './section.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { createSectionSchema, updateSectionSchema } from './section.validation';
import { z } from 'zod';
export declare class SectionController {
    private readonly sectionService;
    constructor(sectionService: SectionService);
    getSections(courseId: number): Promise<{
        data: ({
            lessons: {
                id: number;
                title: string;
                order: number;
                youtubeUrl: string | null;
                duration: number | null;
                isPreview: boolean;
                sectionId: number;
            }[];
        } & {
            id: number;
            title: string;
            courseId: number;
            order: number;
        })[];
        message: string;
    }>;
    createSection(courseId: number, user: CurrentUserPayload, body: z.infer<typeof createSectionSchema>): Promise<{
        data: {
            id: number;
            title: string;
            courseId: number;
            order: number;
        };
        message: string;
    }>;
    updateSection(id: number, user: CurrentUserPayload, body: z.infer<typeof updateSectionSchema>): Promise<{
        data: {
            id: number;
            title: string;
            courseId: number;
            order: number;
        };
        message: string;
    }>;
    deleteSection(id: number, user: CurrentUserPayload): Promise<{
        data: {
            id: number;
            title: string;
            courseId: number;
            order: number;
        };
        message: string;
    }>;
}
//# sourceMappingURL=section.controller.d.ts.map