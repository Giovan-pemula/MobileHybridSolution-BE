import { PrismaService } from '../common/prisma/prisma.service';
export declare class RatingRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUserAndCourse(userId: number, courseId: number): Promise<{
        id: number;
        createdAt: Date;
        courseId: number;
        userId: number;
        rating: number;
        review: string | null;
    } | null>;
    findById(id: number): Promise<{
        id: number;
        createdAt: Date;
        courseId: number;
        userId: number;
        rating: number;
        review: string | null;
    } | null>;
    findByCourse(courseId: number): Promise<({
        user: {
            id: number;
            name: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        courseId: number;
        userId: number;
        rating: number;
        review: string | null;
    })[]>;
    create(data: {
        userId: number;
        courseId: number;
        rating: number;
        review?: string;
    }): Promise<{
        user: {
            id: number;
            name: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        courseId: number;
        userId: number;
        rating: number;
        review: string | null;
    }>;
    update(id: number, data: {
        rating?: number;
        review?: string;
    }): Promise<{
        user: {
            id: number;
            name: string;
            avatar: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        courseId: number;
        userId: number;
        rating: number;
        review: string | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        createdAt: Date;
        courseId: number;
        userId: number;
        rating: number;
        review: string | null;
    }>;
}
//# sourceMappingURL=rating.repository.d.ts.map