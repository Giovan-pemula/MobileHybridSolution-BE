import { Injectable, NotFoundException, ConflictException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { EnrollmentRepository } from '../enrollment/enrollment.repository';
import { PrismaService } from '../common/prisma/prisma.service';
import { env } from '../config/env';
import * as crypto from 'crypto';
import { snap } from '../config/midtrans';
import { OrderStatus } from '../../generated/prisma/enums';
@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly prisma: PrismaService,
  ) {}

  async getOrders(userId: number) {
    return this.orderRepository.findByUser(userId);
  }

  async createOrder(userId: number, courseIds: number[]) {
    const courses = await this.prisma.course.findMany({
      where: { id: { in: courseIds }, status: 'PUBLISHED' },
    });

    if (courses.length !== courseIds.length) throw new NotFoundException('One or more courses not found');

    for (const course of courses) {
      const existing = await this.enrollmentRepository.findByUserAndCourse(userId, course.id);
      if (existing) throw new ConflictException('Already enrolled in one of the courses');
    }

    const items = courses.map((course) => ({
      courseId: course.id,
      price: course.isFree ? 0 : course.price,
    }));

    const order = await this.orderRepository.create(userId, items);

    if (order.total === 0) {
      for (const course of courses) {
        await this.enrollmentRepository.create(userId, course.id);
      }
      return { ...order, snapToken: null, snapRedirectUrl: null };
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const midtransOrderId = `ORDER-${order.id}-${Date.now()}`;
    const payload = {
      transaction_details: {
        order_id: midtransOrderId,
        gross_amount: order.total,
      },
      credit_card: { secure: true },
      item_details: courses.map((course) => ({
        id: course.id.toString(),
        price: course.price,
        quantity: 1,
        name: course.title.substring(0, 50),
      })),
      customer_details: {
        first_name: user.name,
        email: user.email,
      },
    };

    try {
      const transaction = await snap.createTransaction(payload);

      return {
        ...order,
        snapToken: transaction.token,
        snapRedirectUrl: transaction.redirect_url,
      };
    } catch (error: any) {
      await this.prisma.order.delete({ where: { id: order.id } });
      throw new BadRequestException(`Payment gateway error: ${error.message}`);
    }
  }

  async handleWebhook(payload: any) {
    const { order_id, status_code, gross_amount, signature_key, transaction_status, fraud_status } = payload;
    
    const hash = crypto.createHash('sha512');
    hash.update(`${order_id}${status_code}${gross_amount}${env.MIDTRANS_SERVER_KEY}`);
    const calculatedSignature = hash.digest('hex');

    if (calculatedSignature !== signature_key) {
      throw new ForbiddenException('Invalid signature');
    }

    const orderIdStr = order_id.split('-')[1];
    const orderId = parseInt(orderIdStr, 10);
    if (isNaN(orderId)) throw new BadRequestException('Invalid order id format');

    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');

    if ((order.status as OrderStatus) === OrderStatus.COMPLETED) {
      return { message: 'Order already completed' };
    }

    let newStatus: OrderStatus = order.status as OrderStatus;

    if (transaction_status === 'capture' || transaction_status === 'settlement') {
      if (fraud_status === 'challenge') {
        newStatus = OrderStatus.PENDING;
      } else {
        newStatus = OrderStatus.COMPLETED;
      }
    } else if (transaction_status === 'cancel' || transaction_status === 'deny' || transaction_status === 'expire') {
      newStatus = OrderStatus.CANCELLED;
    } else if (transaction_status === 'pending') {
      newStatus = OrderStatus.PENDING;
    }

    if (newStatus !== (order.status as OrderStatus)) {
      await this.orderRepository.updateStatus(orderId, newStatus);
      if (newStatus === OrderStatus.COMPLETED) {
        for (const item of order.items) {
          const existing = await this.enrollmentRepository.findByUserAndCourse(order.userId, item.courseId);
          if (!existing) {
            await this.enrollmentRepository.create(order.userId, item.courseId);
          }
        }
      }
    }

    return { message: 'Webhook processed' };
  }

  async syncPaymentStatus(userId: number, orderId: number) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException('Order not found');
    if (order.userId !== userId) throw new ForbiddenException('Not your order');
    
    return order;
  }
}
