import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { SectionRepository } from './section.repository';
import { CourseRepository } from '../course/course.repository';

@Injectable()
export class SectionService {
  constructor(
    private readonly sectionRepository: SectionRepository,
    private readonly courseRepository: CourseRepository,
  ) {}

  async getSectionsByCourse(courseId: number) {
    return this.sectionRepository.findByCourseId(courseId);
  }

  async createSection(courseId: number, userId: number, userRole: string, data: { title: string; order?: number }) {
    const course = await this.courseRepository.findById(courseId);
    if (!course) throw new NotFoundException('Course not found');
    if (userRole !== 'ADMIN' && course.trainerId !== userId) throw new ForbiddenException('Access denied');
    return this.sectionRepository.create({ ...data, courseId });
  }

  async updateSection(id: number, userId: number, userRole: string, data: { title?: string; order?: number }) {
    const section = await this.sectionRepository.findById(id);
    if (!section) throw new NotFoundException('Section not found');
    if (userRole !== 'ADMIN' && section.course.trainerId !== userId) throw new ForbiddenException('Access denied');
    return this.sectionRepository.update(id, data);
  }

  async deleteSection(id: number, userId: number, userRole: string) {
    const section = await this.sectionRepository.findById(id);
    if (!section) throw new NotFoundException('Section not found');
    if (userRole !== 'ADMIN' && section.course.trainerId !== userId) throw new ForbiddenException('Access denied');
    return this.sectionRepository.delete(id);
  }
}
