import prisma from '../config/database';

export class CategoryRepository {
  async findAll() {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { courses: true } } },
    });
  }

  async findById(id: number) {
    return prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { courses: true } } },
    });
  }

  async findBySlug(slug: string) {
    return prisma.category.findUnique({ where: { slug } });
  }

  async create(data: { name: string; slug: string }) {
    return prisma.category.create({ data });
  }

  async update(id: number, data: { name?: string; slug?: string }) {
    return prisma.category.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.category.delete({ where: { id } });
  }
}

export const categoryRepository = new CategoryRepository();
