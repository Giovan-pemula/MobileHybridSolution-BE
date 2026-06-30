import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from '../src/order/order.service';
import { OrderRepository } from '../src/order/order.repository';
import { EnrollmentRepository } from '../src/enrollment/enrollment.repository';
import { PrismaService } from '../src/common/prisma/prisma.service';
import { GamificationService } from '../src/gamification/gamification.service';
import { NotFoundException, ConflictException, ForbiddenException, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

jest.mock('../src/config/midtrans', () => ({
  snap: {
    createTransaction: jest.fn().mockResolvedValue({
      token: 'mock-snap-token',
      redirect_url: 'https://mock-redirect-url',
    }),
  },
}));

jest.mock('../src/config/env', () => ({
  env: {
    MIDTRANS_SERVER_KEY: 'mock-server-key',
    NODE_ENV: 'development',
  },
}));

describe('OrderService', () => {
  let service: OrderService;
  let orderRepository: jest.Mocked<OrderRepository>;
  let enrollmentRepository: jest.Mocked<EnrollmentRepository>;
  let prisma: jest.Mocked<PrismaService>;
  let gamificationService: jest.Mocked<GamificationService>;

  beforeEach(async () => {
    const mockOrderRepository = {
      findByUser: jest.fn(),
      findAllWithRevenue: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      updateStatus: jest.fn(),
    };

    const mockEnrollmentRepository = {
      findByUserAndCourse: jest.fn(),
      create: jest.fn(),
    };

    const mockPrisma = {
      course: { findMany: jest.fn() },
      coupon: { findFirst: jest.fn(), update: jest.fn() },
      user: { findUnique: jest.fn() },
      order: { delete: jest.fn() },
    };

    const mockGamificationService = {
      addXp: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: OrderRepository, useValue: mockOrderRepository },
        { provide: EnrollmentRepository, useValue: mockEnrollmentRepository },
        { provide: PrismaService, useValue: mockPrisma },
        { provide: GamificationService, useValue: mockGamificationService },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    orderRepository = module.get(OrderRepository);
    enrollmentRepository = module.get(EnrollmentRepository);
    prisma = module.get(PrismaService);
    gamificationService = module.get(GamificationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getOrders', () => {
    it('should return user orders successfully', async () => {
      orderRepository.findByUser.mockResolvedValue([{ id: 1, total: 50000 }] as any);

      const result = await service.getOrders(1);

      expect(result).toHaveLength(1);
      expect(orderRepository.findByUser).toHaveBeenCalledWith(1);
    });
  });

  describe('getAllOrdersForAdmin', () => {
    it('should fetch all orders list for admin panel', async () => {
      orderRepository.findAllWithRevenue.mockResolvedValue([{ id: 1, total: 200000, revenue: 160000 }] as any);

      const result = await service.getAllOrdersForAdmin();

      expect(result).toHaveLength(1);
      expect(orderRepository.findAllWithRevenue).toHaveBeenCalled();
    });
  });

  describe('createOrder', () => {
    it('should create a free order and auto-enroll the user without payment gateway', async () => {
      const mockCourses = [{ id: 10, price: 0, isFree: true, title: 'Free Course' }];
      (prisma.course.findMany as jest.Mock).mockResolvedValue(mockCourses);
      enrollmentRepository.findByUserAndCourse.mockResolvedValue(null);
      orderRepository.create.mockResolvedValue({ id: 1, total: 0 } as any);

      const result = await service.createOrder(1, [10]);

      expect(result.total).toBe(0);
      expect(result.snapToken).toBeNull();
      expect(enrollmentRepository.create).toHaveBeenCalledWith(1, 10);
    });

    it('should create a paid order and get a Midtrans token', async () => {
      const mockCourses = [{ id: 11, price: 100000, isFree: false, title: 'Paid Course' }];
      (prisma.course.findMany as jest.Mock).mockResolvedValue(mockCourses);
      enrollmentRepository.findByUserAndCourse.mockResolvedValue(null);
      orderRepository.create.mockResolvedValue({ id: 2, total: 110000 } as any); // 100k price + 10k service fee
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, email: 'user@test.com', name: 'User' });

      const result = await service.createOrder(1, [11]);

      expect(result.total).toBe(110000);
      expect(result.snapToken).toBe('mock-snap-token');
      expect(result.snapRedirectUrl).toBe('https://mock-redirect-url');
    });

    it('should apply coupon correctly to paid order', async () => {
      const mockCourses = [{ id: 11, price: 100000, isFree: false, title: 'Paid Course' }];
      (prisma.course.findMany as jest.Mock).mockResolvedValue(mockCourses);
      enrollmentRepository.findByUserAndCourse.mockResolvedValue(null);
      (prisma.coupon.findFirst as jest.Mock).mockResolvedValue({ id: 5, discountPct: 20, userId: 1, isUsed: false });
      (prisma.coupon.update as jest.Mock).mockResolvedValue({});
      orderRepository.create.mockResolvedValue({ id: 2, total: 90000 } as any); // (100k - 20k) + 10k = 90k
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1, email: 'user@test.com', name: 'User' });

      const result = await service.createOrder(1, [11], 5);

      expect(result.total).toBe(90000);
      expect(prisma.coupon.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException if one of the courses does not exist', async () => {
      (prisma.course.findMany as jest.Mock).mockResolvedValue([]);

      await expect(service.createOrder(1, [99])).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if user is already enrolled', async () => {
      const mockCourses = [{ id: 10, price: 0, isFree: true, title: 'Free Course' }];
      (prisma.course.findMany as jest.Mock).mockResolvedValue(mockCourses);
      enrollmentRepository.findByUserAndCourse.mockResolvedValue({ id: 1 } as any);

      await expect(service.createOrder(1, [10])).rejects.toThrow(ConflictException);
    });
  });

  describe('handleWebhook', () => {
    it('should process settlement webhook and complete order', async () => {
      const orderId = 2;
      const grossAmount = '110000.00';
      const statusCode = '200';
      
      const signaturePayload = `ORDER-${orderId}-12345${statusCode}${grossAmount}mock-server-key`;
      const expectedSignature = crypto.createHash('sha512').update(signaturePayload).digest('hex');

      const mockOrder = {
        id: orderId,
        userId: 1,
        status: 'PENDING',
        items: [{ courseId: 10 }],
      };

      orderRepository.findById.mockResolvedValue(mockOrder as any);
      enrollmentRepository.findByUserAndCourse.mockResolvedValue(null);

      const result = await service.handleWebhook({
        order_id: `ORDER-${orderId}-12345`,
        status_code: statusCode,
        gross_amount: grossAmount,
        signature_key: expectedSignature,
        transaction_status: 'settlement',
        fraud_status: 'accept',
      });

      expect(result.message).toBe('Webhook processed');
      expect(orderRepository.updateStatus).toHaveBeenCalledWith(orderId, 'COMPLETED');
      expect(enrollmentRepository.create).toHaveBeenCalledWith(1, 10);
      expect(gamificationService.addXp).toHaveBeenCalledWith(1, 50, 'COURSE_CHECKOUT');
    });

    it('should throw ForbiddenException if signature is invalid', async () => {
      await expect(
        service.handleWebhook({
          order_id: 'ORDER-2-12345',
          status_code: '200',
          gross_amount: '110000.00',
          signature_key: 'invalid_sig',
        }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('previewOrder', () => {
    it('should return calculations for subtotal, discount, and final amount', async () => {
      const mockCourses = [{ id: 11, price: 100000, isFree: false, title: 'Paid Course' }];
      (prisma.course.findMany as jest.Mock).mockResolvedValue(mockCourses);
      (prisma.coupon.findFirst as jest.Mock).mockResolvedValue({ id: 5, discountPct: 20, userId: 1, isUsed: false });

      const result = await service.previewOrder(1, [11], 5);

      expect(result.subtotal).toBe(100000);
      expect(result.discountAmt).toBe(20000);
      expect(result.serviceFee).toBe(10000);
      expect(result.total).toBe(90000);
    });

    it('should throw NotFoundException if one of the courses does not exist', async () => {
      (prisma.course.findMany as jest.Mock).mockResolvedValue([]);

      await expect(service.previewOrder(1, [99])).rejects.toThrow(NotFoundException);
    });
  });

  describe('bypassPayment', () => {
    it('should allow bypassing payment in non-production environments', async () => {
      const mockOrder = {
        id: 2,
        userId: 1,
        status: 'PENDING',
        items: [{ courseId: 10 }],
      };
      orderRepository.findById.mockResolvedValue(mockOrder as any);
      enrollmentRepository.findByUserAndCourse.mockResolvedValue(null);

      const result = await service.bypassPayment(2, 1);

      expect(result.message).toBe('Payment bypassed and processed successfully');
      expect(orderRepository.updateStatus).toHaveBeenCalledWith(2, 'COMPLETED');
    });

    it('should throw ForbiddenException if user tries to bypass someone else\'s order', async () => {
      const mockOrder = { id: 2, userId: 1, status: 'PENDING', items: [] };
      orderRepository.findById.mockResolvedValue(mockOrder as any);

      await expect(service.bypassPayment(2, 99)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('syncPaymentStatus', () => {
    it('should return order details if order belongs to the user', async () => {
      const mockOrder = { id: 2, userId: 1, status: 'COMPLETED' };
      orderRepository.findById.mockResolvedValue(mockOrder as any);

      const result = await service.syncPaymentStatus(1, 2);

      expect(result.id).toBe(2);
      expect(result.status).toBe('COMPLETED');
    });

    it('should throw ForbiddenException if order does not belong to the user', async () => {
      const mockOrder = { id: 2, userId: 1, status: 'COMPLETED' };
      orderRepository.findById.mockResolvedValue(mockOrder as any);

      await expect(service.syncPaymentStatus(99, 2)).rejects.toThrow(ForbiddenException);
    });
  });
});
