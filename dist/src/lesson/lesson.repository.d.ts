import { PrismaService } from '../common/prisma/prisma.service';
export declare class LessonRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<({
        section: {
            course: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                description: string | null;
                price: number;
                isFree: boolean;
                thumbnail: string | null;
                previewYoutubeUrl: string | null;
                status: import("../../generated/prisma/enums").CourseStatus;
                categoryId: number;
                trainerId: number;
            };
        } & {
            id: number;
            title: string;
            courseId: number;
            order: number;
        };
    } & {
        id: number;
        title: string;
        order: number;
        youtubeUrl: string | null;
        duration: number | null;
        isPreview: boolean;
        sectionId: number;
    }) | null>;
    create(data: {
        title: string;
        youtubeUrl?: string;
        duration?: number;
        isPreview?: boolean;
        sectionId: number;
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
    update(id: number, data: {
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
    delete(id: number): Promise<{
        id: number;
        title: string;
        order: number;
        youtubeUrl: string | null;
        duration: number | null;
        isPreview: boolean;
        sectionId: number;
    }>;
}
//# sourceMappingURL=lesson.repository.d.ts.map