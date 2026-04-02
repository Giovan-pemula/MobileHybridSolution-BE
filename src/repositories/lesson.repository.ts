import prisma from '../config/database';

export class LessonRepository {
  async findById(id: number) {
    return prisma.lesson.findUnique({
      where: { id },
      include: { section: { include: { course: true } } },
    });
  }

  async create(data: { title: string; youtubeUrl?: string; duration?: number; isPreview?: boolean; sectionId: number; order?: number }) {
    if (!data.order) {
      const lastLesson = await prisma.lesson.findFirst({
        where: { sectionId: data.sectionId },
        orderBy: { order: 'desc' },
      });
      data.order = (lastLesson?.order ?? 0) + 1;
    }
    return prisma.lesson.create({ data });
  }

  async update(id: number, data: { title?: string; youtubeUrl?: string; duration?: number; isPreview?: boolean; order?: number }) {
    return prisma.lesson.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.lesson.delete({ where: { id } });
  }
}

export const lessonRepository = new LessonRepository();
