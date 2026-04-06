import { PrismaService } from '../common/prisma/prisma.service';
export declare class OrderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByUser(userId: number): Promise<({
        items: ({
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
            price: number;
            courseId: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: import("../../generated/prisma/enums").OrderStatus;
        userId: number;
        total: number;
    })[]>;
    create(userId: number, items: {
        courseId: number;
        price: number;
    }[]): Promise<{
        items: ({
            course: {
                category: {
                    id: number;
                    name: string;
                    createdAt: Date;
                    slug: string;
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
            price: number;
            courseId: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: import("../../generated/prisma/enums").OrderStatus;
        userId: number;
        total: number;
    }>;
}
//# sourceMappingURL=order.repository.d.ts.map