import { categoryRepository } from '../repositories/category.repository';

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export class CategoryService {
  async getAllCategories() {
    return categoryRepository.findAll();
  }

  async getCategoryById(id: number) {
    const category = await categoryRepository.findById(id);
    if (!category) throw new Error('CATEGORY_NOT_FOUND');
    return category;
  }

  async createCategory(data: { name: string }) {
    const slug = slugify(data.name);
    const existing = await categoryRepository.findBySlug(slug);
    if (existing) throw new Error('CATEGORY_ALREADY_EXISTS');
    return categoryRepository.create({ name: data.name, slug });
  }

  async updateCategory(id: number, data: { name?: string }) {
    const category = await categoryRepository.findById(id);
    if (!category) throw new Error('CATEGORY_NOT_FOUND');

    const updateData: { name?: string; slug?: string } = {};
    if (data.name) {
      updateData.name = data.name;
      updateData.slug = slugify(data.name);
    }

    return categoryRepository.update(id, updateData);
  }

  async deleteCategory(id: number) {
    const category = await categoryRepository.findById(id);
    if (!category) throw new Error('CATEGORY_NOT_FOUND');
    await categoryRepository.delete(id);
  }
}

export const categoryService = new CategoryService();
