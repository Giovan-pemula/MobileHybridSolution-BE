import { discussionRepository } from '../repositories/discussion.repository';

export class DiscussionService {
  async getDiscussionsByLesson(lessonId: number) {
    return discussionRepository.findByLessonId(lessonId);
  }

  async createDiscussion(lessonId: number, userId: number, comment: string) {
    return discussionRepository.create({ lessonId, userId, comment });
  }

  async createReply(discussionId: number, userId: number, comment: string) {
    const discussion = await discussionRepository.findById(discussionId);
    if (!discussion) throw new Error('DISCUSSION_NOT_FOUND');
    return discussionRepository.createReply({ discussionId, userId, comment });
  }
}

export const discussionService = new DiscussionService();
