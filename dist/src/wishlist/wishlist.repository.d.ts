import { PrismaService } from '../common/prisma/prisma.service';
export declare class WishlistRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUser(userId: number): Promise<({
        course: {
            category: {
                id: number;
                name: string;
                createdAt: Date;
                slug: string;
            };
            _count: {
                enrollments: number;
            };
            trainer: {
                id: number;
                name: string;
                avatar: string | null;
            };
        } & {
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
        userId: number;
        courseId: number;
    })[]>;
    findByUserAndCourse(userId: number, courseId: number): Promise<{
        id: number;
        userId: number;
        courseId: number;
    } | null>;
    create(userId: number, courseId: number): Promise<{
        course: {
            category: {
                id: number;
                name: string;
                createdAt: Date;
                slug: string;
            };
            trainer: {
                id: number;
                name: string;
                avatar: string | null;
            };
        } & {
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
        userId: number;
        courseId: number;
    }>;
    delete(userId: number, courseId: number): Promise<{
        id: number;
        userId: number;
        courseId: number;
    }>;
}
//# sourceMappingURL=wishlist.repository.d.ts.map