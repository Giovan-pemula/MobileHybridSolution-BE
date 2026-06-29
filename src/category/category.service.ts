import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAllCategories() {
    return this.categoryRepository.findAll();
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async createCategory(data: { name: string }) {
    const slug = slugify(data.name);
    const existing = await this.categoryRepository.findBySlug(slug);
    if (existing) throw new ConflictException('Category already exists');
    return this.categoryRepository.create({ name: data.name, slug });
  }

  async updateCategory(id: number, data: { name?: string }) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');

    const updateData: { name?: string; slug?: string } = {};
    if (data.name) {
      updateData.name = data.name;
      updateData.slug = slugify(data.name);
    }
    return this.categoryRepository.update(id, updateData);
  }

  async deleteCategory(id: number) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new NotFoundException('Category not found');
    return this.categoryRepository.delete(id);
  }
}
