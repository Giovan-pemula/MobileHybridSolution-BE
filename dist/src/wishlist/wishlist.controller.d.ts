import { WishlistService } from './wishlist.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    getWishlist(user: CurrentUserPayload): Promise<{
        data: ({
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
            courseId: number;
            userId: number;
        })[];
        message: string;
    }>;
    addToWishlist(user: CurrentUserPayload, body: {
        courseId: number;
    }): Promise<{
        data: {
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
            courseId: number;
            userId: number;
        };
        message: string;
    }>;
    removeFromWishlist(courseId: number, user: CurrentUserPayload): Promise<{
        data: null;
        message: string;
    }>;
}
//# sourceMappingURL=wishlist.controller.d.ts.map