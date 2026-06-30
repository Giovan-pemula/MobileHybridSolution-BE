import { OrderService } from './order.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { createOrderSchema } from './order.validation';
import { z } from 'zod';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrders(user: CurrentUserPayload): Promise<{
        data: ({
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
            couponId: number | null;
            serviceFee: number;
            discountAmt: number;
        })[];
        message: string;
    }>;
    getAllOrdersWithRevenue(): Promise<{
        data: ({
            user: {
                id: number;
                name: string;
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
            status: import("../../generated/prisma/enums").OrderStatus;
            userId: number;
            total: number;
            couponId: number | null;
            serviceFee: number;
            discountAmt: number;
        })[];
        message: string;
    }>;
    createOrder(user: CurrentUserPayload, body: z.infer<typeof createOrderSchema>): Promise<{
        data: {
            summary: {
                subtotal: number;
                discountAmt: number;
                serviceFee: number;
                total: number;
            };
            snapToken: null;
            snapRedirectUrl: null;
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
            id: number;
            createdAt: Date;
            status: import("../../generated/prisma/enums").OrderStatus;
            userId: number;
            total: number;
            couponId: number | null;
            serviceFee: number;
            discountAmt: number;
        } | {
            summary: {
                subtotal: number;
                discountAmt: number;
                serviceFee: number;
                total: number;
            };
            snapToken: string;
            snapRedirectUrl: string;
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
            id: number;
            createdAt: Date;
            status: import("../../generated/prisma/enums").OrderStatus;
            userId: number;
            total: number;
            couponId: number | null;
            serviceFee: number;
            discountAmt: number;
        };
        message: string;
    }>;
    previewOrder(user: CurrentUserPayload, body: z.infer<typeof createOrderSchema>): Promise<{
        data: {
            subtotal: number;
            discountAmt: number;
            serviceFee: number;
            total: number;
        };
        message: string;
    }>;
    bypassPayment(user: CurrentUserPayload, orderId: number): Promise<{
        data: {
            message: string;
        };
        message: string;
    }>;
    handleWebhook(payload: any): Promise<{
        data: {
            message: string;
        };
        message: string;
    }>;
    getPaymentStatus(user: CurrentUserPayload, orderId: number): Promise<{
        data: {
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
            status: import("../../generated/prisma/enums").OrderStatus;
            userId: number;
            total: number;
            couponId: number | null;
            serviceFee: number;
            discountAmt: number;
        };
        message: string;
    }>;
}
//# sourceMappingURL=order.controller.d.ts.map