import { Controller, Get, Post, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@Controller()
@UseGuards(JwtAuthGuard)
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get('my-courses')
  async getMyCourses(@CurrentUser() user: CurrentUserPayload) {
    const courses = await this.enrollmentService.getMyCourses(user.id);
    return { data: courses, message: 'My courses fetched successfully' };
  }

  @Post('courses/:courseId/enroll')
  async enrollInCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const enrollment = await this.enrollmentService.enrollInCourse(user.id, courseId);
    return { data: enrollment, message: 'Enrolled successfully' };
  }
}
