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
            status: import("../../generated/prisma/enums").OrderStatus;
            createdAt: Date;
        })[];
        message: string;
    }>;
    createOrder(user: CurrentUserPayload, body: z.infer<typeof createOrderSchema>): Promise<{
        data: {
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
                orderId: number;
                courseId: number;
            })[];
            id: number;
            userId: number;
            total: number;
            status: import("../../generated/prisma/enums").OrderStatus;
            createdAt: Date;
        } | {
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
                orderId: number;
                courseId: number;
            })[];
            id: number;
            userId: number;
            total: number;
            status: import("../../generated/prisma/enums").OrderStatus;
            createdAt: Date;
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
                orderId: number;
                courseId: number;
            })[];
        } & {
            id: number;
            userId: number;
            total: number;
            status: import("../../generated/prisma/enums").OrderStatus;
            createdAt: Date;
        };
        message: string;
    }>;
}
//# sourceMappingURL=order.controller.d.ts.map