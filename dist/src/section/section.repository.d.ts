import { PrismaService } from '../common/prisma/prisma.service';
export declare class SectionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByCourseId(courseId: number): Promise<({
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
    })[]>;
    findById(id: number): Promise<({
        course: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
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