import {
  Controller, Get, Post, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiProperty,
} from '@nestjs/swagger';
import { DiscussionService } from './discussion.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createDiscussionSchema, createReplySchema } from './discussion.validation';
import { z } from 'zod';

class CreateDiscussionDto {
  @ApiProperty({ example: 'Apakah materi ini mencakup deployment ke AWS?' })
  comment: string;
}
class CreateReplyDto {
  @ApiProperty({ example: 'Iya, akan dibahas di section terakhir!' })
  comment: string;
}

@ApiTags('Discussions')
@Controller()
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Get('lessons/:lessonId/discussions')
  @ApiOperation({ summary: 'Ambil semua diskusi pada sebuah lesson' })
  @ApiParam({ name: 'lessonId', description: 'ID lesson' })
  @ApiResponse({ status: 200, description: 'Diskusi berhasil diambil.' })
  async getDiscussions(@Param('lessonId', ParseIntPipe) lessonId: number) {
    const discussions = await this.discussionService.getDiscussionsByLesson(lessonId);
    return { data: discussions, message: 'Discussions fetched successfully' };
  }

  @Post('lessons/:lessonId/discussions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Buat komentar / diskusi baru pada sebuah lesson' })
  @ApiParam({ name: 'lessonId', description: 'ID lesson' })
  @ApiBody({ type: CreateDiscussionDto })
  @ApiResponse({ status: 201, description: 'Diskusi berhasil dibuat.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async createDiscussion(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createDiscussionSchema)) body: z.infer<typeof createDiscussionSchema>,
  ) {
    const discussion = await this.discussionService.createDiscussion(lessonId, user.id, body.comment);
    return { data: discussion, message: 'Discussion created successfully' };
  }

  @Post('discussions/:id/replies')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Balas sebuah diskusi', description: 'Membuat balasan (reply) pada diskusi tertentu.' })
  @ApiParam({ name: 'id', description: 'ID diskusi yang ingin dibalas' })
  @ApiBody({ type: CreateReplyDto })
  @ApiResponse({ status: 201, description: 'Balasan berhasil dibuat.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async createReply(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createReplySchema)) body: z.infer<typeof createReplySchema>,
  ) {
    const reply = await this.discussionService.createReply(id, user.id, body.comment);
    return { data: reply, message: 'Reply created successfully' };
  }
}
