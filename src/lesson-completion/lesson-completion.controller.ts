import { Controller, Get, Post, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam,
} from '@nestjs/swagger';
import { LessonCompletionService } from './lesson-completion.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@ApiTags('Lesson Completion')
@ApiBearerAuth('access-token')
@Controller()
@UseGuards(JwtAuthGuard)
export class LessonCompletionController {
  constructor(private readonly lessonCompletionService: LessonCompletionService) {}

  @Post('lessons/:lessonId/complete')
  @ApiOperation({
    summary: 'Toggle status selesai pada sebuah lesson',
    description: 'Jika lesson belum selesai → ditandai selesai. Jika sudah selesai → ditandai belum selesai (toggle). Juga memicu perhitungan poin gamifikasi.',
  })
  @ApiParam({ name: 'lessonId', description: 'ID lesson yang ingin di-toggle status selesainya' })
  @ApiResponse({ status: 201, description: 'Status lesson berhasil diperbarui.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async toggleLessonCompletion(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @CurrentUser() user: CurrentUserPayload,
  ) {
    const result = await this.lessonCompletionService.toggleLessonCompletion(user.id, lessonId);
    const message = result.completed ? 'Lesson marked as completed' : 'Lesson marked as incomplete';
    return { data: result, message };
  }

  @Get('analytics/learning')
  @ApiOperation({
    summary: 'Ambil analitik belajar pengguna yang login',
    description: 'Mengembalikan statistik belajar: total lesson selesai, total jam belajar, progress per kursus, dan streak belajar.',
  })
  @ApiResponse({ status: 200, description: 'Analitik belajar berhasil diambil.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async getLearningAnalytics(@CurrentUser() user: CurrentUserPayload) {
    const analytics = await this.lessonCompletionService.getLearningAnalytics(user.id);
    return { data: analytics, message: 'Learning analytics fetched successfully' };
  }
}
