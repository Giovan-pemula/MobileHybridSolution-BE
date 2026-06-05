import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class TrainerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard(trainerId: number) {
    const [totalCourses, totalStudents, latestCourses] = await Promise.all([
      this.prisma.course.count({ where: { trainerId } }),
      this.prisma.enrollment.count({ where: { course: { trainerId } } }),
      this.prisma.course.findMany({
        where: { trainerId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          _count: { select: { enrollments: true, ratings: true } },
        },
      }),
    ]);

    const revenue = await this.prisma.orderItemRevenue.aggregate({
      where: { orderItem: { course: { trainerId } } },
      _sum: { trainerShare: true },
    });

    return {
      totalCourses,
      totalStudents,
      totalRevenue: revenue._sum.trainerShare || 0,
      latestCourses,
    };
  }

  async getSales(trainerId: number) {
    const courses = await this.prisma.course.findMany({
      where: { trainerId },
      include: {
        _count: { select: { enrollments: true } },
        orderItems: {
          select: {
            revenue: { select: { trainerShare: true } },
          },
        },
      },
    });

    const salesData = courses.map((course) => {
      const totalRevenue = course.orderItems.reduce((sum, item) => sum + (item.revenue?.trainerShare || 0), 0);
      return {
        courseId: course.id,
        title: course.title,
        totalStudents: course._count.enrollments,
        totalRevenue,
      };
    });

    return {
      totalCoursesSold: salesData.reduce((sum, s) => sum + s.totalStudents, 0),
      totalRevenue: salesData.reduce((sum, s) => sum + s.totalRevenue, 0),
      totalStudents: salesData.reduce((sum, s) => sum + s.totalStudents, 0),
      courses: salesData,
    };
  }
}
