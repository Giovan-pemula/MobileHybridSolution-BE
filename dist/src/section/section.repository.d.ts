import { PrismaService } from '../common/prisma/prisma.service';
export declare class SectionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByCourseId(courseId: number): Promise<({
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
    }) | null>;
    create(data: {
        title: string;
        courseId: number;
        order?: number;
    }): Promise<{
        id: number;
        title: string;
        courseId: number;
        order: number;
    }>;
    update(id: number, data: {
        title?: string;
        order?: number;
    }): Promise<{
        id: number;
        title: string;
        courseId: number;
        order: number;
    }>;
    delete(id: number): Promise<{
        id: number;
        title: string;
        courseId: number;
        order: number;
    }>;
}
//# sourceMappingURL=section.repository.d.ts.map