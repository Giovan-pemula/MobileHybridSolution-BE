import { Test, TestingModule } from '@nestjs/testing';
import { LessonService } from '../src/lesson/lesson.service';
import { LessonRepository } from '../src/lesson/lesson.repository';
import { SectionRepository } from '../src/section/section.repository';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('LessonService', () => {
  let service: LessonService;
  let lessonRepository: jest.Mocked<LessonRepository>;
  let sectionRepository: jest.Mocked<SectionRepository>;

  beforeEach(async () => {
    const mockLessonRepository = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn(),
    };

    const mockSectionRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonService,
        { provide: LessonRepository, useValue: mockLessonRepository },
        { provide: SectionRepository, useValue: mockSectionRepository },
      ],
    }).compile();

    service = module.get<LessonService>(LessonService);
    lessonRepository = module.get(LessonRepository);
    sectionRepository = module.get(SectionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createLesson', () => {
    it('should create lesson if user is trainer of course', async () => {
      sectionRepository.findById.mockResolvedValue({ id: 5, course: { trainerId: 10 } } as any);
      lessonRepository.create.mockResolvedValue({ id: 1, title: 'Intro' } as any);

      const result = await service.createLesson(5, 10, 'TRAINER', { title: 'Intro' });
      expect(result.title).toBe('Intro');
    });

    it('should allow ADMIN to create lesson regardless of trainerId', async () => {
      sectionRepository.findById.mockResolvedValue({ id: 5, course: { trainerId: 10 } } as any);
      lessonRepository.create.mockResolvedValue({ id: 1, title: 'Intro' } as any);

      const result = await service.createLesson(5, 99, 'ADMIN', { title: 'Intro' });
      expect(result.title).toBe('Intro');
    });

    it('should throw ForbiddenException if user is not the trainer', async () => {
      sectionRepository.findById.mockResolvedValue({ id: 5, course: { trainerId: 10 } } as any);
      await expect(
        service.createLesson(5, 11, 'TRAINER', { title: 'Intro' }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if section is not found', async () => {
      sectionRepository.findById.mockResolvedValue(null);
      await expect(
        service.createLesson(99, 10, 'TRAINER', { title: 'Intro' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateLesson', () => {
    it('should update lesson successfully', async () => {
      lessonRepository.findById.mockResolvedValue({ id: 1, section: { course: { trainerId: 10 } } } as any);
      lessonRepository.update.mockResolvedValue({ id: 1, title: 'Updated' } as any);

      const result = await service.updateLesson(1, 10, 'TRAINER', { title: 'Updated' });
      expect(result.title).toBe('Updated');
    });
  });

  describe('deleteLesson', () => {
    it('should delete lesson successfully', async () => {
      lessonRepository.findById.mockResolvedValue({ id: 1, section: { course: { trainerId: 10 } } } as any);
      lessonRepository.delete.mockResolvedValue({ id: 1 } as any);

      const result = await service.deleteLesson(1, 10, 'TRAINER');
      expect(lessonRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
