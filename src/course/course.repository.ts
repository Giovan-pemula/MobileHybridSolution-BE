import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

export interface CourseFilters {
  categoryId?: number;
  search?: string;
  isFree?: boolean;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  trainerId?: number;
}

@Injectable()
export class CourseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(skip: number, limit: number, filters: CourseFilters) {
    const where: any = {};
    if (filters.categoryId) where.categoryId = filters.categoryId;
    if (filters.trainerId) where.trainerId = filters.trainerId;
    if (filters.status) where.status = filters.status;
    if (filters.isFree !== undefined) where.isFree = filters.isFree;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {};
      if (filters.minPrice !== undefined) where.price.gte = filters.minPrice;
      if (filters.maxPrice !== undefined) where.price.lte = filters.maxPrice;
    }
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const [courses, total] = await Promise.all([
      this.prisma.course.findMany({
        where, skip, take: limit,
        include: {
          category: true,
          trainer: { select: { id: true, name: true, email: true, avatar: true } },
          _count: { select: { enrollments: true, ratings: true } },
          ratings: { select: { rating: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.course.count({ where }),
    ]);

    const coursesWithRating = courses.map((course) => {
      const avgRating = course.ratings.length > 0
        ? course.ratings.reduce((sum, r) => sum + r.rating, 0) / course.ratings.length : 0;
      const { ratings, ...rest } = course;
      return { ...rest, averageRating: Math.round(avgRating * 10) / 10 };
    });

    return { courses: coursesWithRating, total };
  }

  async findById(id: number) {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        category: true,
        trainer: { select: { id: true, name: true, email: true, avatar: true } },
        sections: { orderBy: { order: 'asc' }, include: { lessons: { orderBy: { order: 'asc' } } } },
        _count: { select: { enrollments: true, ratings: true } },
        ratings: { select: { rating: true } },
      },
    });
  }

  async create(data: { title: string; description?: string; price?: number; isFree?: boolean; thumbnail?: string; previewYoutubeUrl?: string; categoryId: number; trainerId: number; status?: string }) {
    return this.prisma.course.create({
      data: data as any,
      include: {
        category: true,
        trainer: { select: { id: true, name: true, email: true, avatar: true } },
      },
    });
  }

  async update(id: number, data: any) {
    return this.prisma.course.update({
      where: { id }, data,
      include: {
        category: true,
        trainer: { select: { id: true, name: true, email: true, avatar: true } },
      },
    });
  }

  async delete(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }

  async getStudents(courseId: number, skip: number, limit: number) {
    const [enrollments, total] = await Promise.all([
      this.prisma.enrollment.findMany({
        where: { courseId }, skip, take: limit,
        include: { user: { select: { id: true, name: true, email: true, avatar: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.enrollment.count({ where: { courseId } }),
    ]);
    return { enrollments, total };
  }
}
