import { OrderRepository } from './order.repository';
import { EnrollmentRepository } from '../enrollment/enrollment.repository';
import { PrismaService } from '../common/prisma/prisma.service';
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
    })[]>;
    createOrder(userId: number, courseIds: number[]): Promise<{
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
    }>;
}
//# sourceMappingURL=order.service.d.ts.map