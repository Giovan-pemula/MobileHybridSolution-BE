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
                order: number;
                id: number;
                title: string;
                duration: number | null;
                youtubeUrl: string | null;
                isPreview: boolean;
                sectionId: number;
            }[];
        } & {
            order: number;
            id: number;
            title: string;
            courseId: number;
        })[];
        message: string;
    }>;
    createSection(courseId: number, user: CurrentUserPayload, body: z.infer<typeof createSectionSchema>): Promise<{
        data: {
            order: number;
            id: number;
            title: string;
            courseId: number;
        };
        message: string;
    }>;
    updateSection(id: number, user: CurrentUserPayload, body: z.infer<typeof updateSectionSchema>): Promise<{
        data: {
            order: number;
            id: number;
            title: string;
            courseId: number;
        };
        message: string;
    }>;
    deleteSection(id: number, user: CurrentUserPayload): Promise<{
        data: {
            order: number;
            id: number;
            title: string;
            courseId: number;
        };
        message: string;
    }>;
}
//# sourceMappingURL=section.controller.d.ts.map