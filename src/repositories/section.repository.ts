import prisma from '../config/database';

export class SectionRepository {
  async findByCourseId(courseId: number) {
    return prisma.section.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
      include: {
        lessons: { orderBy: { order: 'asc' } },
      },
    });
  }

  async findById(id: number) {
    return prisma.section.findUnique({
      where: { id },
      include: { course: true, lessons: { orderBy: { order: 'asc' } } },
    });
  }

  async create(data: { title: string; courseId: number; order?: number }) {
    if (!data.order) {
      const lastSection = await prisma.section.findFirst({
        where: { courseId: data.courseId },
        orderBy: { order: 'desc' },
      });
      data.order = (lastSection?.order ?? 0) + 1;
    }
    return prisma.section.create({ data });
  }

  async update(id: number, data: { title?: string; order?: number }) {
    return prisma.section.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.section.delete({ where: { id } });
  }
}

export const sectionRepository = new SectionRepository();
