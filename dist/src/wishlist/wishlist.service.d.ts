import { WishlistRepository } from './wishlist.repository';
export declare class WishlistService {
    private readonly wishlistRepository;
    constructor(wishlistRepository: WishlistRepository);
    getWishlist(userId: number): Promise<({
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
    })[]>;
    addToWishlist(userId: number, courseId: number): Promise<{
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
    }>;
    removeFromWishlist(userId: number, courseId: number): Promise<void>;
}
//# sourceMappingURL=wishlist.service.d.ts.map