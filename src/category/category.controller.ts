import {
  Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createCategorySchema, updateCategorySchema } from '../validations/category.validation';
import { z } from 'zod';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    const categories = await this.categoryService.getAllCategories();
    return { data: categories, message: 'Categories fetched successfully' };
  }

  @Get(':id')
  async getCategory(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.getCategoryById(id);
    return { data: category, message: 'Category fetched successfully' };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createCategory(@Body(new ZodValidationPipe(createCategorySchema)) body: z.infer<typeof createCategorySchema>) {
    const category = await this.categoryService.createCategory(body);
    return { data: category, message: 'Category created successfully' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateCategorySchema)) body: z.infer<typeof updateCategorySchema>,
  ) {
    const category = await this.categoryService.updateCategory(id, body);
    return { data: category, message: 'Category updated successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.deleteCategory(id);
    return { data: null, message: 'Category deleted successfully' };
  }
}
