import { OrderService } from './order.service';
import { CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { createOrderSchema } from '../validations/order.validation';
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
            total: number;
            status: import("../../generated/prisma/enums").OrderStatus;
            userId: number;
        })[];
        message: string;
    }>;
    createOrder(user: CurrentUserPayload, body: z.infer<typeof createOrderSchema>): Promise<{
        data: {
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
            total: number;
            status: import("../../generated/prisma/enums").OrderStatus;
            userId: number;
        };
        message: string;
    }>;
}
//# sourceMappingURL=order.controller.d.ts.map