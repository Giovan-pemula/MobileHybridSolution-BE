import { RatingRepository } from './rating.repository';
export declare class RatingService {
    private readonly ratingRepository;
    constructor(ratingRepository: RatingRepository);
    getCourseRatings(courseId: number): Promise<({
        user: {
            name: string;
            id: number;
            avatar: string | null;
        };
    } & {
        rating: number;
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
        review: string | null;
    })[]>;
    createRating(userId: number, courseId: number, data: {
        rating: number;
        review?: string;
    }): Promise<{
        user: {
            name: string;
            id: number;
            avatar: string | null;
        };
    } & {
        rating: number;
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
        review: string | null;
    }>;
    updateRating(id: number, userId: number, data: {
        rating?: number;
        review?: string;
    }): Promise<{
        user: {
            name: string;
            id: number;
            avatar: string | null;
        };
    } & {
        rating: number;
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
        review: string | null;
    }>;
    deleteRating(id: number, userId: number): Promise<{
        rating: number;
        id: number;
        createdAt: Date;
        userId: number;
        courseId: number;
        review: string | null;
    }>;
}
//# sourceMappingURL=rating.service.d.ts.map