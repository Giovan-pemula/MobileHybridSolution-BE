import { PrismaService } from '../common/prisma/prisma.service';
export declare class SectionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByCourseId(courseId: number): Promise<({
        lessons: {
            order: number;
            id: number;
            title: string;
            youtubeUrl: string | null;
            duration: number | null;
            isPreview: boolean;
            sectionId: number;
        }[];
    } & {
        order: number;
        id: number;
        title: string;
        courseId: number;
    })[]>;
    findById(id: number): Promise<({
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
        lessons: {
            order: number;
            id: number;
            title: string;
            youtubeUrl: string | null;
            duration: number | null;
            isPreview: boolean;
            sectionId: number;
        }[];
    } & {
        order: number;
        id: number;
        title: string;
        courseId: number;
    }) | null>;
    create(data: {
        title: string;
        courseId: number;
        order?: number;
    }): Promise<{
        order: number;
        id: number;
        title: string;
        courseId: number;
    }>;
    update(id: number, data: {
        title?: string;
        order?: number;
    }): Promise<{
        order: number;
        id: number;
        title: string;
        courseId: number;
    }>;
    delete(id: number): Promise<{
        order: number;
        id: number;
        title: string;
        courseId: number;
    }>;
}
//# sourceMappingURL=section.repository.d.ts.map