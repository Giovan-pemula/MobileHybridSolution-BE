import { sectionRepository } from '../repositories/section.repository';
import { courseRepository } from '../repositories/course.repository';

export class SectionService {
  async getSectionsByCourse(courseId: number) {
    return sectionRepository.findByCourseId(courseId);
  }

  async createSection(courseId: number, userId: number, userRole: string, data: { title: string; order?: number }) {
    const course = await courseRepository.findById(courseId);
    if (!course) throw new Error('COURSE_NOT_FOUND');
    if (userRole !== 'ADMIN' && course.trainerId !== userId) throw new Error('FORBIDDEN');
    return sectionRepository.create({ ...data, courseId });
  }

  async updateSection(id: number, userId: number, userRole: string, data: { title?: string; order?: number }) {
    const section = await sectionRepository.findById(id);
    if (!section) throw new Error('SECTION_NOT_FOUND');
    if (userRole !== 'ADMIN' && section.course.trainerId !== userId) throw new Error('FORBIDDEN');
    return sectionRepository.update(id, data);
  }

  async deleteSection(id: number, userId: number, userRole: string) {
    const section = await sectionRepository.findById(id);
    if (!section) throw new Error('SECTION_NOT_FOUND');
    if (userRole !== 'ADMIN' && section.course.trainerId !== userId) throw new Error('FORBIDDEN');
    await sectionRepository.delete(id);
  }
}

export const sectionService = new SectionService();
