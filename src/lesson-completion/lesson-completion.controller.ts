import { Controller, Get, Post, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { LessonCompletionService } from './lesson-completion.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@Controller()
@UseGuards(JwtAuthGuard)
export class LessonCompletionController {
  constructor(private readonly lessonCompletionService: LessonCompletionService) {}

  @Post('lessons/:lessonId/complete')
  async toggleLessonCompletion(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.lessonCompletionService.toggleLessonCompletion(user.id, lessonId);
    const message = result.completed ? 'Lesson marked as completed' : 'Lesson marked as incomplete';
    return { data: result, message };
  }

  @Get('analytics/learning')
  async getLearningAnalytics(@CurrentUser() user: CurrentUserPayload) {
    const analytics = await this.lessonCompletionService.getLearningAnalytics(user.id);
    return { data: analytics, message: 'Learning analytics fetched successfully' };
  }
}
