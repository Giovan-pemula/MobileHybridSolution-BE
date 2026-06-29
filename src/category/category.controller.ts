import {
  Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiProperty,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createCategorySchema, updateCategorySchema } from './category.validation';
import { z } from 'zod';

class CreateCategoryDto {
  @ApiProperty({ example: 'Programming' }) name: string;
}
class UpdateCategoryDto {
  @ApiProperty({ example: 'Web Development', required: false }) name?: string;
}

@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil semua kategori kursus' })
  @ApiResponse({ status: 200, description: 'Daftar kategori berhasil diambil.' })
  async getCategories() {
    const categories = await this.categoryService.getAllCategories();
    return { data: categories, message: 'Categories fetched successfully' };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Ambil kategori berdasarkan ID' })
  @ApiParam({ name: 'id', description: 'ID kategori' })
  @ApiResponse({ status: 200, description: 'Kategori berhasil diambil.' })
  @ApiResponse({ status: 404, description: 'Kategori tidak ditemukan.' })
  async getCategory(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.getCategoryById(id);
    return { data: category, message: 'Category fetched successfully' };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[ADMIN] Buat kategori baru' })
  @ApiBody({ type: CreateCategoryDto })
  @ApiResponse({ status: 201, description: 'Kategori berhasil dibuat.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, bukan ADMIN.' })
  async createCategory(@Body(new ZodValidationPipe(createCategorySchema)) body: z.infer<typeof createCategorySchema>) {
    const category = await this.categoryService.createCategory(body);
    return { data: category, message: 'Category created successfully' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[ADMIN] Update kategori' })
  @ApiParam({ name: 'id', description: 'ID kategori' })
  @ApiBody({ type: UpdateCategoryDto })
  @ApiResponse({ status: 200, description: 'Kategori berhasil diperbarui.' })
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
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[ADMIN] Hapus kategori' })
  @ApiParam({ name: 'id', description: 'ID kategori' })
  @ApiResponse({ status: 200, description: 'Kategori berhasil dihapus.' })
  async deleteCategory(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.categoryService.deleteCategory(id);
    return { data: deleted, message: `Category "${deleted.name}" deleted successfully` };
  }
}
