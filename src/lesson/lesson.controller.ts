import {
  Controller, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createLessonSchema, updateLessonSchema } from './lesson.validation';
import { z } from 'zod';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('TRAINER', 'ADMIN')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post('sections/:sectionId/lessons')
  async createLesson(
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createLessonSchema)) body: z.infer<typeof createLessonSchema>,
  ) {
    const lesson = await this.lessonService.createLesson(sectionId, user.id, user.role, body);
    return { data: lesson, message: 'Lesson created successfully' };
  }

  @Patch('lessons/:id')
  async updateLesson(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(updateLessonSchema)) body: z.infer<typeof updateLessonSchema>,
  ) {
    const lesson = await this.lessonService.updateLesson(id, user.id, user.role, body);
    return { data: lesson, message: 'Lesson updated successfully' };
  }

  @Delete('lessons/:id')
  async deleteLesson(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const deleted = await this.lessonService.deleteLesson(id, user.id, user.role);
    return { data: deleted, message: `Lesson "${deleted.title}" deleted successfully` };
  }
}
