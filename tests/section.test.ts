import { Test, TestingModule } from '@nestjs/testing';
import { SectionService } from '../src/section/section.service';
import { SectionRepository } from '../src/section/section.repository';
import { CourseRepository } from '../src/course/course.repository';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('SectionService', () => {
  let service: SectionService;
  let sectionRepository: jest.Mocked<SectionRepository>;
  let courseRepository: jest.Mocked<CourseRepository>;

  beforeEach(async () => {
    const mockSectionRepository = {
      findByCourseId: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const mockCourseRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionService,
        { provide: SectionRepository, useValue: mockSectionRepository },
        { provide: CourseRepository, useValue: mockCourseRepository },
      ],
    }).compile();

    service = module.get<SectionService>(SectionService);
    sectionRepository = module.get(SectionRepository);
    courseRepository = module.get(CourseRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getSectionsByCourse', () => {
    it('should return sections in course', async () => {
      sectionRepository.findByCourseId.mockResolvedValue([{ id: 1, title: 'Basics' }] as any);
      const result = await service.getSectionsByCourse(10);
      expect(result).toHaveLength(1);
      expect(sectionRepository.findByCourseId).toHaveBeenCalledWith(10);
    });
  });

  describe('createSection', () => {
    it('should create section if user is trainer of course', async () => {
      courseRepository.findById.mockResolvedValue({ id: 10, trainerId: 5 } as any);
      sectionRepository.create.mockResolvedValue({ id: 1, title: 'Basics' } as any);

      const result = await service.createSection(10, 5, 'TRAINER', { title: 'Basics' });
      expect(result.title).toBe('Basics');
    });

    it('should throw ForbiddenException if user is not the trainer', async () => {
      courseRepository.findById.mockResolvedValue({ id: 10, trainerId: 5 } as any);
      await expect(
        service.createSection(10, 6, 'TRAINER', { title: 'Basics' }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('updateSection', () => {
    it('should update section successfully', async () => {
      sectionRepository.findById.mockResolvedValue({ id: 1, course: { trainerId: 5 } } as any);
      sectionRepository.update.mockResolvedValue({ id: 1, title: 'Advanced' } as any);

      const result = await service.updateSection(1, 5, 'TRAINER', { title: 'Advanced' });
      expect(result.title).toBe('Advanced');
    });
  });

  describe('deleteSection', () => {
    it('should delete section successfully', async () => {
      sectionRepository.findById.mockResolvedValue({ id: 1, course: { trainerId: 5 } } as any);
      sectionRepository.delete.mockResolvedValue({ id: 1 } as any);

      const result = await service.deleteSection(1, 5, 'TRAINER');
      expect(sectionRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
