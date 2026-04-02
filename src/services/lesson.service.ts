import { lessonRepository } from '../repositories/lesson.repository';
import { sectionRepository } from '../repositories/section.repository';

export class LessonService {
  async createLesson(
    sectionId: number,
    userId: number,
    userRole: string,
    data: { title: string; youtubeUrl?: string; duration?: number; isPreview?: boolean; order?: number },
  ) {
    const section = await sectionRepository.findById(sectionId);
    if (!section) throw new Error('SECTION_NOT_FOUND');
    if (userRole !== 'ADMIN' && section.course.trainerId !== userId) throw new Error('FORBIDDEN');
    return lessonRepository.create({ ...data, sectionId });
  }

  async updateLesson(
    id: number,
    userId: number,
    userRole: string,
    data: { title?: string; youtubeUrl?: string; duration?: number; isPreview?: boolean; order?: number },
  ) {
    const lesson = await lessonRepository.findById(id);
    if (!lesson) throw new Error('LESSON_NOT_FOUND');
    if (userRole !== 'ADMIN' && lesson.section.course.trainerId !== userId) throw new Error('FORBIDDEN');
    return lessonRepository.update(id, data);
  }

  async deleteLesson(id: number, userId: number, userRole: string) {
    const lesson = await lessonRepository.findById(id);
    if (!lesson) throw new Error('LESSON_NOT_FOUND');
    if (userRole !== 'ADMIN' && lesson.section.course.trainerId !== userId) throw new Error('FORBIDDEN');
    await lessonRepository.delete(id);
  }
}

export const lessonService = new LessonService();
