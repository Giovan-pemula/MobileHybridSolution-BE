import { OrderRepository } from './order.repository';
import { EnrollmentRepository } from '../enrollment/enrollment.repository';
import { PrismaService } from '../common/prisma/prisma.service';
import { OrderStatus } from '../../generated/prisma/enums';
export declare class OrderService {
    private readonly orderRepository;
    private readonly enrollmentRepository;
    private readonly prisma;
    constructor(orderRepository: OrderRepository, enrollmentRepository: EnrollmentRepository, prisma: PrismaService);
    getOrders(userId: number): Promise<({
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
    createOrder(userId: number, courseIds: number[]): Promise<{
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
        status: OrderStatus;
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
        status: OrderStatus;
        createdAt: Date;
    }>;
    handleWebhook(payload: any): Promise<{
        message: string;
    }>;
    syncPaymentStatus(userId: number, orderId: number): Promise<{
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
}
//# sourceMappingURL=order.service.d.ts.map