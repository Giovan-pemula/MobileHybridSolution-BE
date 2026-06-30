import { WishlistService } from './wishlist.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    getWishlist(user: CurrentUserPayload): Promise<{
        data: ({
            course: {
                category: {
                    name: string;
                    id: number;
                    createdAt: Date;
                    slug: string;
                };
                _count: {
                    enrollments: number;
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
            userId: number;
            courseId: number;
        })[];
        message: string;
    }>;
    addToWishlist(user: CurrentUserPayload, body: {
        courseId: number;
    }): Promise<{
        data: {
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
            userId: number;
            courseId: number;
        };
        message: string;
    }>;
    removeFromWishlist(courseId: number, user: CurrentUserPayload): Promise<{
        data: {
            id: number;
            userId: number;
            courseId: number;
        };
        message: string;
    }>;
}
//# sourceMappingURL=wishlist.controller.d.ts.map