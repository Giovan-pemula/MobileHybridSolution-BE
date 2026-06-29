import {
  Controller, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiProperty,
} from '@nestjs/swagger';
import { LessonService } from './lesson.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createLessonSchema, updateLessonSchema } from './lesson.validation';
import { z } from 'zod';

class CreateLessonDto {
  @ApiProperty({ example: 'Apa itu NestJS?' })                       title: string;
  @ApiProperty({ example: 'https://youtube.com/...', required: false }) videoUrl?: string;
  @ApiProperty({ example: 'Teks materi...', required: false })        content?: string;
  @ApiProperty({ example: 1, required: false })                       order?: number;
  @ApiProperty({ example: 300, description: 'Durasi dalam detik', required: false }) duration?: number;
}
class UpdateLessonDto {
  @ApiProperty({ example: 'NestJS Module System', required: false }) title?: string;
  @ApiProperty({ required: false }) videoUrl?: string;
  @ApiProperty({ required: false }) content?: string;
  @ApiProperty({ required: false }) order?: number;
  @ApiProperty({ required: false }) duration?: number;
}

@ApiTags('Lessons')
@ApiBearerAuth('access-token')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('TRAINER', 'ADMIN')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('sections/:sectionId/lessons')
  @ApiOperation({ summary: '[TRAINER/ADMIN] Buat lesson baru di dalam section' })
  @ApiParam({ name: 'sectionId', description: 'ID section' })
  @ApiBody({ type: CreateLessonDto })
  @ApiResponse({ status: 201, description: 'Lesson berhasil dibuat.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak.' })
  async createLesson(
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createLessonSchema)) body: z.infer<typeof createLessonSchema>,
  ) {
    const lesson = await this.lessonService.createLesson(sectionId, user.id, user.role, body);
    return { data: lesson, message: 'Lesson created successfully' };
  }

  @Patch('lessons/:id')
  @ApiOperation({ summary: '[TRAINER/ADMIN] Update lesson' })
  @ApiParam({ name: 'id', description: 'ID lesson' })
  @ApiBody({ type: UpdateLessonDto })
  @ApiResponse({ status: 200, description: 'Lesson berhasil diperbarui.' })
  async updateLesson(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(updateLessonSchema)) body: z.infer<typeof updateLessonSchema>,
  ) {
    const lesson = await this.lessonService.updateLesson(id, user.id, user.role, body);
    return { data: lesson, message: 'Lesson updated successfully' };
  }

  @Delete('lessons/:id')
  @ApiOperation({ summary: '[TRAINER/ADMIN] Hapus lesson' })
  @ApiParam({ name: 'id', description: 'ID lesson' })
  @ApiResponse({ status: 200, description: 'Lesson berhasil dihapus.' })
  async deleteLesson(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const deleted = await this.lessonService.deleteLesson(id, user.id, user.role);
    return { data: deleted, message: `Lesson "${deleted.title}" deleted successfully` };
  }
}
