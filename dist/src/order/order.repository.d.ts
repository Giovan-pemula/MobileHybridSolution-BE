import { PrismaService } from '../common/prisma/prisma.service';
import { OrderStatus } from '../../generated/prisma/enums';
export declare class OrderRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<({
        items: ({
            course: {
                id: number;
                title: string;
                price: number;
                thumbnail: string | null;
            };
        } & {
            id: number;
            price: number;
            orderId: number;
            courseId: number;
        })[];
    } & {
        id: number;
        userId: number;
        total: number;
        status: OrderStatus;
        createdAt: Date;
    }) | null>;
    findByUser(userId: number): Promise<({
        items: ({
            course: {
                category: {
                    id: number;
                    createdAt: Date;
                    name: string;
                    slug: string;
                };
                trainer: {
                    id: number;
                    name: string;
                };
            } & {
                id: number;
                status: import("../../generated/prisma/enums").CourseStatus;
                createdAt: Date;
                title: string;
                description: string | null;
                price: number;
                isFree: boolean;
                thumbnail: string | null;
                previewYoutubeUrl: string | null;
                categoryId: number;
                trainerId: number;
                updatedAt: Date;
            };
        } & {
            id: number;
            price: number;
            orderId: number;
            courseId: number;
        })[];
    } & {
        id: number;
        userId: number;
        total: number;
        status: OrderStatus;
        createdAt: Date;
    })[]>;
    create(userId: number, items: {
        courseId: number;
        price: number;
    }[]): Promise<{
        items: ({
            course: {
                id: number;
                title: string;
                price: number;
                thumbnail: string | null;
            };
        } & {
            id: number;
            price: number;
            orderId: number;
            courseId: number;
        })[];
    } & {
        id: number;
        userId: number;
        total: number;
        status: OrderStatus;
        createdAt: Date;
    }>;
    updateStatus(id: number, status: OrderStatus): Promise<{
        items: ({
            course: {
                id: number;
                status: import("../../generated/prisma/enums").CourseStatus;
                createdAt: Date;
                title: string;
                description: string | null;
                price: number;
                isFree: boolean;
                thumbnail: string | null;
                previewYoutubeUrl: string | null;
                categoryId: number;
                trainerId: number;
                updatedAt: Date;
            };
        } & {
            id: number;
            price: number;
            orderId: number;
            courseId: number;
        })[];
    } & {
        id: number;
        userId: number;
        total: number;
        status: OrderStatus;
        createdAt: Date;
    }>;
}
//# sourceMappingURL=order.repository.d.ts.map