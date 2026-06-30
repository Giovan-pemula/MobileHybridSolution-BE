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
        total: number;
        status: OrderStatus;
        userId: number;
        couponId: number | null;
        serviceFee: number;
        discountAmt: number;
    }) | null>;
    findByUser(userId: number): Promise<({
        items: ({
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
        total: number;
        status: OrderStatus;
        userId: number;
        couponId: number | null;
        serviceFee: number;
        discountAmt: number;
    })[]>;
    findAllWithRevenue(): Promise<({
        user: {
            name: string;
            id: number;
            email: string;
        };
        items: ({
            course: {
                id: number;
                title: string;
                trainer: {
                    name: string;
                };
            };
            revenue: {
                id: number;
                discountAmt: number;
                basePrice: number;
                netRevenue: number;
                trainerShare: number;
                platformShare: number;
                orderItemId: number;
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
        total: number;
        status: OrderStatus;
        userId: number;
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
        } & {
            id: number;
            price: number;
            courseId: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        total: number;
        status: OrderStatus;
        userId: number;
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
        total: number;
        status: OrderStatus;
        userId: number;
        couponId: number | null;
        serviceFee: number;
        discountAmt: number;
    }>;
}
//# sourceMappingURL=order.repository.d.ts.map