import { WishlistRepository } from './wishlist.repository';
export declare class WishlistService {
    private readonly wishlistRepository;
    constructor(wishlistRepository: WishlistRepository);
    getWishlist(userId: number): Promise<({
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
    addToWishlist(userId: number, courseId: number): Promise<{
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
    removeFromWishlist(userId: number, courseId: number): Promise<{
        id: number;
        userId: number;
        courseId: number;
    }>;
}
//# sourceMappingURL=wishlist.service.d.ts.map