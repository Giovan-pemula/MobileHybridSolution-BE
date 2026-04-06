import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { EnrollmentRepository } from '../enrollment/enrollment.repository';
import { PrismaService } from '../common/prisma/prisma.service';

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

    for (const course of courses) {
      await this.enrollmentRepository.create(userId, course.id);
    }

    return order;
  }
}
