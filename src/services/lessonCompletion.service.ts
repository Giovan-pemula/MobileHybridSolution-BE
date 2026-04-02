import { lessonCompletionRepository } from '../repositories/lessonCompletion.repository';

export class LessonCompletionService {
  async toggleLessonCompletion(userId: number, lessonId: number) {
    return lessonCompletionRepository.toggleCompletion(userId, lessonId);
  }

  async getLearningAnalytics(userId: number) {
    return lessonCompletionRepository.getLearningAnalytics(userId);
  }
}

export const lessonCompletionService = new LessonCompletionService();
