import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createCourseSchema, updateCourseSchema } from '../validations/course.validation';
import { z } from 'zod';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getCourses(@Query() query: Record<string, any>) {
    const result = await this.courseService.getAllCourses(query);
    return { data: result, message: 'Courses fetched successfully' };
  }

  @Get(':id')
  async getCourse(@Param('id', ParseIntPipe) id: number) {
    const course = await this.courseService.getCourseById(id);
    return { data: course, message: 'Course fetched successfully' };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  async createCourse(
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createCourseSchema)) body: z.infer<typeof createCourseSchema>,
  ) {
    const course = await this.courseService.createCourse(user.id, body);
    return { data: course, message: 'Course created successfully' };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(updateCourseSchema)) body: z.infer<typeof updateCourseSchema>,
  ) {
    const course = await this.courseService.updateCourse(id, user.id, user.role, body);
    return { data: course, message: 'Course updated successfully' };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  async deleteCourse(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    await this.courseService.deleteCourse(id, user.id, user.role);
    return { data: null, message: 'Course deleted successfully' };
  }

  @Get(':courseId/students')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TRAINER', 'ADMIN')
  async getCourseStudents(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Query() query: Record<string, any>,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.courseService.getCourseStudents(courseId, query, user.id, user.role);
    return { data: result, message: 'Students fetched successfully' };
  }
}
