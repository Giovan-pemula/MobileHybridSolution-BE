import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class LessonRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: { section: { include: { course: true } } },
    });
  }

  async create(data: { title: string; youtubeUrl?: string; duration?: number; isPreview?: boolean; sectionId: number; order?: number }) {
    if (!data.order) {
      const lastLesson = await this.prisma.lesson.findFirst({
        where: { sectionId: data.sectionId },
        orderBy: { order: 'desc' },
      });
      data.order = (lastLesson?.order ?? 0) + 1;
    }
    return this.prisma.lesson.create({ data });
  }

  async update(id: number, data: { title?: string; youtubeUrl?: string; duration?: number; isPreview?: boolean; order?: number }) {
    return this.prisma.lesson.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
