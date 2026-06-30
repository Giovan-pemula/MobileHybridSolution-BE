import { PrismaService } from '../common/prisma/prisma.service';
export declare class EnrollmentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUserAndCourse(userId: number, courseId: number): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
        progress: number;
        completed: boolean;
    } | null>;
    findByUser(userId: number): Promise<({
        course: {
            category: {
                name: string;
                id: number;
                createdAt: Date;
                slug: string;
            };
            _count: {
                sections: number;
            };
            trainer: {
                name: string;
                id: number;
                avatar: string | null;
            };
        } & {
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
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
        progress: number;
        completed: boolean;
    })[]>;
    create(userId: number, courseId: number): Promise<{
        course: {
            category: {
                name: string;
                id: number;
                createdAt: Date;
                slug: string;
            };
            trainer: {
                name: string;
                id: number;
                avatar: string | null;
            };
        } & {
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
    } & {
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
        progress: number;
        completed: boolean;
    }>;
    updateProgress(userId: number, courseId: number, progress: number, completed: boolean): Promise<{
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
        progress: number;
        completed: boolean;
    }>;
}
//# sourceMappingURL=enrollment.repository.d.ts.map