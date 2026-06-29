import { Injectable, NotFoundException } from '@nestjs/common';
import { DiscussionRepository } from './discussion.repository';

@Injectable()
export class DiscussionService {
  constructor(private readonly discussionRepository: DiscussionRepository) {}

  async getDiscussionsByLesson(lessonId: number) {
    return this.discussionRepository.findByLessonId(lessonId);
  }

  async createDiscussion(lessonId: number, userId: number, comment: string) {
    return this.discussionRepository.create({ lessonId, userId, comment });
  }

  async createReply(discussionId: number, userId: number, comment: string) {
    const discussion = await this.discussionRepository.findById(discussionId);
    if (!discussion) throw new NotFoundException('Discussion not found');
    return this.discussionRepository.createReply({ discussionId, userId, comment });
  }
}
