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
            courseId: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: OrderStatus;
        userId: number;
        total: number;
        couponId: number | null;
        serviceFee: number;
        discountAmt: number;
    }) | null>;
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
        status: OrderStatus;
        userId: number;
        total: number;
        couponId: number | null;
        serviceFee: number;
        discountAmt: number;
    })[]>;
    create(userId: number, total: number, couponId: number | null, discountAmt: number, serviceFee: number, items: {
        courseId: number;
        price: number;
        revenue: {
            basePrice: number;
            discountAmt: number;
            netRevenue: number;
            trainerShare: number;
            platformShare: number;
        };
    }[]): Promise<{
        items: ({
            course: {
                id: number;
                title: string;
                price: number;
                thumbnail: string | null;
            };
            revenue: {
                id: number;
                discountAmt: number;
                orderItemId: number;
                basePrice: number;
                netRevenue: number;
                trainerShare: number;
                platformShare: number;
            } | null;
        } & {
            id: number;
            price: number;
            courseId: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        status: OrderStatus;
        userId: number;
        total: number;
        couponId: number | null;
        serviceFee: number;
        discountAmt: number;
    }>;
    updateStatus(id: number, status: OrderStatus): Promise<{
        items: ({
            course: {
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
        status: OrderStatus;
        userId: number;
        total: number;
        couponId: number | null;
        serviceFee: number;
        discountAmt: number;
    }>;
}
//# sourceMappingURL=order.repository.d.ts.map