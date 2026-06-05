import { Injectable, NotFoundException, ConflictException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { EnrollmentRepository } from '../enrollment/enrollment.repository';
import { PrismaService } from '../common/prisma/prisma.service';
import { env } from '../config/env';
import * as crypto from 'crypto';
import { snap } from '../config/midtrans';
import { OrderStatus } from '../../generated/prisma/enums';
import { GamificationService } from '../gamification/gamification.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly enrollmentRepository: EnrollmentRepository,
    private readonly prisma: PrismaService,
    private readonly gamificationService: GamificationService,
  ) {}

  async getOrders(userId: number) {
    return this.orderRepository.findByUser(userId);
  }

  async getAllOrdersForAdmin() {
    return this.orderRepository.findAllWithRevenue();
  }

  async createOrder(userId: number, courseIds: number[], couponId?: number) {
    const courses = await this.prisma.course.findMany({
      where: { id: { in: courseIds }, status: 'PUBLISHED' },
    });

    if (courses.length !== courseIds.length) throw new NotFoundException('One or more courses not found');

    for (const course of courses) {
      const existing = await this.enrollmentRepository.findByUserAndCourse(userId, course.id);
      if (existing) throw new ConflictException('Already enrolled in one of the courses');
    }

    let couponDiscountPct = 0;
    if (couponId) {
      const coupon = await this.prisma.coupon.findFirst({
        where: { id: couponId, userId, isUsed: false },
      });
      if (!coupon) throw new NotFoundException('Coupon not found or already used');
      couponDiscountPct = coupon.discountPct;
      
      // Mark coupon as used immediately
      await this.prisma.coupon.update({
        where: { id: couponId },
        data: { isUsed: true, usedAt: new Date() },
      });
    }

    const cartTotal = courses.reduce((sum, course) => sum + (course.isFree ? 0 : course.price), 0);
    const totalCouponDiscount = cartTotal * (couponDiscountPct / 100);
    const serviceFee = 10000;
    
    // Total price to pay = cartTotal - discount + serviceFee
    const finalTotal = Math.max(0, cartTotal - totalCouponDiscount) + serviceFee;

    const items = courses.map((course) => {
      const basePrice = course.isFree ? 0 : course.price;
      
      // Proportional discount allocation
      let allocatedDiscount = 0;
      if (cartTotal > 0) {
        allocatedDiscount = (basePrice / cartTotal) * totalCouponDiscount;
      }

      const netRevenue = basePrice - allocatedDiscount;
      const trainerShare = netRevenue * 0.8;
      const platformShare = netRevenue * 0.2;

      return {
        courseId: course.id,
        price: basePrice,
        revenue: {
          basePrice,
          discountAmt: allocatedDiscount,
          netRevenue,
          trainerShare,
          platformShare,
        },
      };
    });

    const order = await this.orderRepository.create(
      userId,
      finalTotal,
      couponId || null,
      totalCouponDiscount,
      serviceFee,
      items
    );

    const summary = {
      subtotal: cartTotal,
      discountAmt: totalCouponDiscount,
      serviceFee,
      total: finalTotal,
    };

    if (order.total === 0 || cartTotal === 0) {
      for (const course of courses) {
        await this.enrollmentRepository.create(userId, course.id);
      }
      return { ...order, summary, snapToken: null, snapRedirectUrl: null };
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const midtransOrderId = `ORDER-${order.id}-${Date.now()}`;
    
    // Setup midtrans item details
    const itemDetails = courses.map((course) => ({
      id: `COURSE-${course.id}`,
      price: course.price,
      quantity: 1,
      name: course.title.substring(0, 50),
    }));

    if (totalCouponDiscount > 0) {
      itemDetails.push({
        id: `COUPON-${couponId}`,
        price: -Math.round(totalCouponDiscount),
        quantity: 1,
        name: `Coupon Discount ${couponDiscountPct}%`,
      });
    }

    itemDetails.push({
      id: `FEE-SERVICE`,
      price: serviceFee,
      quantity: 1,
      name: 'Platform Service Fee',
    });

    const payload = {
      transaction_details: {
        order_id: midtransOrderId,
        gross_amount: Math.round(finalTotal),
      },
      credit_card: { secure: true },
      item_details: itemDetails,
      customer_details: {
        first_name: user.name,
        email: user.email,
      },
    };

    try {
      const transaction = await snap.createTransaction(payload);

      return {
        ...order,
        summary,
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

        await this.gamificationService.addXp(order.userId, 50 * order.items.length, 'COURSE_CHECKOUT');
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
