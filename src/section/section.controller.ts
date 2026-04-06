import {
  Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { SectionService } from './section.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createSectionSchema, updateSectionSchema } from '../validations/section.validation';
import { z } from 'zod';

@Controller()
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Get('courses/:courseId/sections')
  async getSections(@Param('courseId', ParseIntPipe) courseId: number) {
    const sections = await this.sectionService.getSectionsByCourse(courseId);
    return { data: sections, message: 'Sections fetched successfully' };
  }

  @Post('courses/:courseId/sections')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
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
  async deleteSection(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    await this.sectionService.deleteSection(id, user.id, user.role);
    return { data: null, message: 'Section deleted successfully' };
  }
}
