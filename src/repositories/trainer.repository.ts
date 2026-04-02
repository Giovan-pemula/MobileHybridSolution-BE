import prisma from '../config/database';

export class TrainerRepository {
  async getDashboard(trainerId: number) {
    const [totalCourses, totalStudents, latestCourses] = await Promise.all([
      prisma.course.count({ where: { trainerId } }),
      prisma.enrollment.count({
        where: { course: { trainerId } },
      }),
      prisma.course.findMany({
        where: { trainerId },
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          _count: { select: { enrollments: true, ratings: true } },
        },
      }),
    ]);

    // Calculate total revenue from orders
    const revenue = await prisma.orderItem.aggregate({
      where: { course: { trainerId } },
      _sum: { price: true },
    });

    return {
      totalCourses,
      totalStudents,
      totalRevenue: revenue._sum.price || 0,
      latestCourses,
    };
  }

  async getSales(trainerId: number) {
    const courses = await prisma.course.findMany({
      where: { trainerId },
      include: {
        _count: { select: { enrollments: true } },
        orderItems: {
          select: { price: true },
        },
      },
    });

    const salesData = courses.map((course) => {
      const totalRevenue = course.orderItems.reduce((sum, item) => sum + item.price, 0);
      return {
        courseId: course.id,
        title: course.title,
        totalStudents: course._count.enrollments,
        totalRevenue,
      };
    });

    const totalCoursesSold = salesData.reduce((sum, s) => sum + s.totalStudents, 0);
    const totalRevenue = salesData.reduce((sum, s) => sum + s.totalRevenue, 0);
    const totalStudents = totalCoursesSold;

    return {
      totalCoursesSold,
      totalRevenue,
      totalStudents,
      courses: salesData,
    };
  }
}

export const trainerRepository = new TrainerRepository();
