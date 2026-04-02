import { orderRepository } from '../repositories/order.repository';
import { enrollmentRepository } from '../repositories/enrollment.repository';
import prisma from '../config/database';

export class OrderService {
  async getOrders(userId: number) {
    return orderRepository.findByUser(userId);
  }

  async createOrder(userId: number, courseIds: number[]) {
    // Fetch courses and validate all exist
    const courses = await prisma.course.findMany({
      where: { id: { in: courseIds }, status: 'PUBLISHED' },
    });

    if (courses.length !== courseIds.length) {
      throw new Error('SOME_COURSES_NOT_FOUND');
    }

    // Check if already enrolled in any
    for (const course of courses) {
      const existing = await enrollmentRepository.findByUserAndCourse(userId, course.id);
      if (existing) {
        throw new Error(`ALREADY_ENROLLED_IN_${course.id}`);
      }
    }

    // Create order
    const items = courses.map((course) => ({
      courseId: course.id,
      price: course.isFree ? 0 : course.price,
    }));

    const order = await orderRepository.create(userId, items);

    // Auto-enroll user in purchased courses
    for (const course of courses) {
      await enrollmentRepository.create(userId, course.id);
    }

    return order;
  }
}

export const orderService = new OrderService();
