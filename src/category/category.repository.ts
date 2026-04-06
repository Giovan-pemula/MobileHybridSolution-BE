import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { courses: true } } },
    });
  }

  async findById(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
      include: { _count: { select: { courses: true } } },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.category.findUnique({ where: { slug } });
  }

  async create(data: { name: string; slug: string }) {
    return this.prisma.category.create({ data });
  }

  async update(id: number, data: { name?: string; slug?: string }) {
    return this.prisma.category.update({ where: { id }, data });
  }

  async delete(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
