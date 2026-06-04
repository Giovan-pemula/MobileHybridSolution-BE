import { OrderRepository } from './order.repository';
import { EnrollmentRepository } from '../enrollment/enrollment.repository';
import { PrismaService } from '../common/prisma/prisma.service';
import { OrderStatus } from '../../generated/prisma/enums';
import { GamificationService } from '../gamification/gamification.service';
export declare class OrderService {
    private readonly orderRepository;
    private readonly enrollmentRepository;
    private readonly prisma;
    private readonly gamificationService;
    constructor(orderRepository: OrderRepository, enrollmentRepository: EnrollmentRepository, prisma: PrismaService, gamificationService: GamificationService);
    getOrders(userId: number): Promise<({
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
    createOrder(userId: number, courseIds: number[], couponId?: number): Promise<{
        snapToken: null;
        snapRedirectUrl: null;
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
        id: number;
        createdAt: Date;
        status: OrderStatus;
        userId: number;
        total: number;
        couponId: number | null;
        serviceFee: number;
        discountAmt: number;
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
        id: number;
        createdAt: Date;
        status: OrderStatus;
        userId: number;
        total: number;
        couponId: number | null;
        serviceFee: number;
        discountAmt: number;
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
//# sourceMappingURL=order.service.d.ts.map