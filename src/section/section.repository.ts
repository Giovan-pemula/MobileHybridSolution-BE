import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class SectionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByCourseId(courseId: number) {
    return this.prisma.section.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
      include: { lessons: { orderBy: { order: 'asc' } } },
    });
  }

  async findById(id: number) {
    return this.prisma.section.findUnique({
      where: { id },
      include: { course: true, lessons: { orderBy: { order: 'asc' } } },
    });
  }

  async create(data: { title: string; courseId: number; order?: number }) {
    if (!data.order) {
      const lastSection = await this.prisma.section.findFirst({
        where: { courseId: data.courseId },
        orderBy: { order: 'desc' },
      });
      data.order = (lastSection?.order ?? 0) + 1;
    }
    return this.prisma.section.create({ data });
  }

  async update(id: number, data: { title?: string; order?: number }) {
    return this.prisma.section.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.section.delete({ where: { id } });
  }
}
