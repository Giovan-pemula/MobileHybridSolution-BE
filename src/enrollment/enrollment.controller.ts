import { Controller, Get, Post, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam,
} from '@nestjs/swagger';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@ApiTags('Enrollments')
@ApiBearerAuth('access-token')
@Controller()
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get('my-courses')
  @ApiOperation({ summary: 'Ambil semua kursus yang sudah diikuti oleh pengguna yang login' })
  @ApiResponse({ status: 200, description: 'Daftar kursus berhasil diambil.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async getMyCourses(@CurrentUser() user: CurrentUserPayload) {
    const courses = await this.enrollmentService.getMyCourses(user.id);
    return { data: courses, message: 'My courses fetched successfully' };
  }

  @Post('courses/:courseId/enroll')
  @ApiOperation({ summary: 'Daftar ke kursus gratis', description: 'Hanya berlaku untuk kursus dengan harga 0. Untuk kursus berbayar, gunakan endpoint Orders.' })
  @ApiParam({ name: 'courseId', description: 'ID kursus yang ingin didaftarkan' })
  @ApiResponse({ status: 201, description: 'Berhasil mendaftar ke kursus.' })
  @ApiResponse({ status: 409, description: 'Pengguna sudah terdaftar di kursus ini.' })
  async enrollInCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const enrollment = await this.enrollmentService.enrollInCourse(user.id, courseId);
    return { data: enrollment, message: 'Enrolled successfully' };
  }
}
