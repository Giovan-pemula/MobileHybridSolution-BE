import { RatingRepository } from './rating.repository';
export declare class RatingService {
    private readonly ratingRepository;
    constructor(ratingRepository: RatingRepository);
    getCourseRatings(courseId: number): Promise<({
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
    createRating(userId: number, courseId: number, data: {
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
    updateRating(id: number, userId: number, data: {
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
    deleteRating(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        courseId: number;
        userId: number;
        rating: number;
        review: string | null;
    }>;
}
//# sourceMappingURL=rating.service.d.ts.map