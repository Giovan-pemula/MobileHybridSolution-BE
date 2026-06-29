import {
  Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiProperty,
} from '@nestjs/swagger';
import { SectionService } from './section.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createSectionSchema, updateSectionSchema } from './section.validation';
import { z } from 'zod';

class CreateSectionDto {
  @ApiProperty({ example: 'Pengenalan NestJS' })          title: string;
  @ApiProperty({ example: 1, required: false })            order?: number;
}
class UpdateSectionDto {
  @ApiProperty({ example: 'NestJS Lanjutan', required: false }) title?: string;
  @ApiProperty({ example: 2, required: false })                  order?: number;
}

@ApiTags('Sections')
@Controller()
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get('courses/:courseId/sections')
  @ApiOperation({ summary: 'Ambil semua section dari sebuah kursus' })
  @ApiParam({ name: 'courseId', description: 'ID kursus' })
  @ApiResponse({ status: 200, description: 'Sections berhasil diambil.' })
  async getSections(@Param('courseId', ParseIntPipe) courseId: number) {
    const sections = await this.sectionService.getSectionsByCourse(courseId);
    return { data: sections, message: 'Sections fetched successfully' };
  }

  @Post('courses/:courseId/sections')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[TRAINER/ADMIN] Buat section baru di dalam kursus' })
  @ApiParam({ name: 'courseId', description: 'ID kursus' })
  @ApiBody({ type: CreateSectionDto })
  @ApiResponse({ status: 201, description: 'Section berhasil dibuat.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak.' })
  async createSection(
    @Param('courseId', ParseIntPipe) courseId: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createSectionSchema)) body: z.infer<typeof createSectionSchema>,
  ) {
    const section = await this.sectionService.createSection(courseId, user.id, user.role, body);
    return { data: section, message: 'Section created successfully' };
  }

  @Patch('sections/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[TRAINER/ADMIN] Update section' })
  @ApiParam({ name: 'id', description: 'ID section' })
  @ApiBody({ type: UpdateSectionDto })
  @ApiResponse({ status: 200, description: 'Section berhasil diperbarui.' })
  async updateSection(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(updateSectionSchema)) body: z.infer<typeof updateSectionSchema>,
  ) {
    const section = await this.sectionService.updateSection(id, user.id, user.role, body);
    return { data: section, message: 'Section updated successfully' };
  }

  @Delete('sections/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[TRAINER/ADMIN] Hapus section' })
  @ApiParam({ name: 'id', description: 'ID section' })
  @ApiResponse({ status: 200, description: 'Section berhasil dihapus.' })
  async deleteSection(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const deleted = await this.sectionService.deleteSection(id, user.id, user.role);
    return { data: deleted, message: `Section "${deleted.title}" deleted successfully` };
  }
}
