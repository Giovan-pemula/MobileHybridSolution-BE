import { Injectable } from '@nestjs/common';
import { LessonCompletionRepository } from './lesson-completion.repository';

@Injectable()
export class LessonCompletionService {
  constructor(private readonly lessonCompletionRepository: LessonCompletionRepository) {}

  async toggleLessonCompletion(userId: number, lessonId: number) {
    return this.lessonCompletionRepository.toggleCompletion(userId, lessonId);
  }

  async getLearningAnalytics(userId: number) {
    return this.lessonCompletionRepository.getLearningAnalytics(userId);
  }
}
