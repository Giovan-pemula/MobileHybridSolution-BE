import {
  Controller, Get, Post, Param, Body, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createDiscussionSchema, createReplySchema } from '../validations/discussion.validation';
import { z } from 'zod';

@Controller()
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @Get('lessons/:lessonId/discussions')
  async getDiscussions(@Param('lessonId', ParseIntPipe) lessonId: number) {
    const discussions = await this.discussionService.getDiscussionsByLesson(lessonId);
    return { data: discussions, message: 'Discussions fetched successfully' };
  }

  @Post('lessons/:lessonId/discussions')
  @UseGuards(JwtAuthGuard)
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
  async createReply(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createReplySchema)) body: z.infer<typeof createReplySchema>,
  ) {
    const reply = await this.discussionService.createReply(id, user.id, body.comment);
    return { data: reply, message: 'Reply created successfully' };
  }
}
