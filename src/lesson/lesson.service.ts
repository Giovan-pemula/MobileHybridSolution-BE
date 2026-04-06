import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { LessonRepository } from './lesson.repository';
import { SectionRepository } from '../section/section.repository';

@Injectable()
export class LessonService {
  constructor(
    private readonly lessonRepository: LessonRepository,
    private readonly sectionRepository: SectionRepository,
  ) {}

  async createLesson(sectionId: number, userId: number, userRole: string, data: { title: string; youtubeUrl?: string; duration?: number; isPreview?: boolean; order?: number }) {
    const section = await this.sectionRepository.findById(sectionId);
    if (!section) throw new NotFoundException('Section not found');
    if (userRole !== 'ADMIN' && section.course.trainerId !== userId) throw new ForbiddenException('Access denied');
    return this.lessonRepository.create({ ...data, sectionId });
  }

  async updateLesson(id: number, userId: number, userRole: string, data: { title?: string; youtubeUrl?: string; duration?: number; isPreview?: boolean; order?: number }) {
    const lesson = await this.lessonRepository.findById(id);
    if (!lesson) throw new NotFoundException('Lesson not found');
    if (userRole !== 'ADMIN' && lesson.section.course.trainerId !== userId) throw new ForbiddenException('Access denied');
    return this.lessonRepository.update(id, data);
  }

  async deleteLesson(id: number, userId: number, userRole: string) {
    const lesson = await this.lessonRepository.findById(id);
    if (!lesson) throw new NotFoundException('Lesson not found');
    if (userRole !== 'ADMIN' && lesson.section.course.trainerId !== userId) throw new ForbiddenException('Access denied');
    await this.lessonRepository.delete(id);
  }
}
