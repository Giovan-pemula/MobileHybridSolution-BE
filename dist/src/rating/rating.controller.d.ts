import { RatingService } from './rating.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { createRatingSchema, updateRatingSchema } from './rating.validation';
import { z } from 'zod';
export declare class RatingController {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    getCourseRatings(courseId: number): Promise<{
        data: ({
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
        })[];
        message: string;
    }>;
    createRating(courseId: number, user: CurrentUserPayload, body: z.infer<typeof createRatingSchema>): Promise<{
        data: {
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
        };
        message: string;
    }>;
    updateRating(id: number, user: CurrentUserPayload, body: z.infer<typeof updateRatingSchema>): Promise<{
        data: {
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
        };
        message: string;
    }>;
    deleteRating(id: number, user: CurrentUserPayload): Promise<{
        data: {
            rating: number;
            id: number;
            createdAt: Date;
            userId: number;
            courseId: number;
            review: string | null;
        };
        message: string;
    }>;
}
//# sourceMappingURL=rating.controller.d.ts.map