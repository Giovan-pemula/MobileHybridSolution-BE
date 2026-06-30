import { Test, TestingModule } from '@nestjs/testing';
import { LessonCompletionService } from '../src/lesson-completion/lesson-completion.service';
import { LessonCompletionRepository } from '../src/lesson-completion/lesson-completion.repository';
import { GamificationService } from '../src/gamification/gamification.service';
import { PrismaService } from '../src/common/prisma/prisma.service';

describe('LessonCompletionService', () => {
  let service: LessonCompletionService;
  let repository: jest.Mocked<LessonCompletionRepository>;
  let gamificationService: jest.Mocked<GamificationService>;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const mockRepository = {
      findByUserAndLesson: jest.fn(),
      toggleCompletion: jest.fn(),
      getLearningAnalytics: jest.fn(),
    };

    const mockGamificationService = {
      handleDailyFirstMark: jest.fn(),
      addXp: jest.fn(),
    };

    const mockPrisma = {
      lesson: { findUnique: jest.fn() },
      lessonCompletion: { count: jest.fn() },
      section: { findMany: jest.fn() },
      enrollment: { update: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LessonCompletionService,
        { provide: LessonCompletionRepository, useValue: mockRepository },
        { provide: GamificationService, useValue: mockGamificationService },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<LessonCompletionService>(LessonCompletionService);
    repository = module.get(LessonCompletionRepository);
    gamificationService = module.get(GamificationService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('toggleLessonCompletion', () => {
    it('should complete lesson, trigger daily login streak check, and grant basic XP', async () => {
      repository.findByUserAndLesson.mockResolvedValue(null); // was not completed
      repository.toggleCompletion.mockResolvedValue({ id: 1, completed: true } as any);
      (prisma.lesson.findUnique as jest.Mock).mockResolvedValue(null); // skip section check

      const result = await service.toggleLessonCompletion(1, 10);

      expect(result.completed).toBe(true);
      expect(gamificationService.handleDailyFirstMark).toHaveBeenCalledWith(1);
      expect(gamificationService.addXp).toHaveBeenCalledWith(1, 3, 'LESSON_COMPLETE');
    });

    it('should complete section and award section XP if all section lessons are completed', async () => {
      repository.findByUserAndLesson.mockResolvedValue(null);
      repository.toggleCompletion.mockResolvedValue({ id: 1, completed: true } as any);

      // Mock Lesson with Section and Lessons inside it
      (prisma.lesson.findUnique as jest.Mock).mockResolvedValue({
        id: 10,
        section: {
          id: 5,
          courseId: 2,
          lessons: [{ id: 10 }, { id: 11 }],
        },
      });

      // Mock that both lessons 10 and 11 are completed
      (prisma.lessonCompletion.count as jest.Mock).mockResolvedValue(2);
      (prisma.section.findMany as jest.Mock).mockResolvedValue([]); // Skip course check

      const result = await service.toggleLessonCompletion(1, 10);

      expect(result.completed).toBe(true);
      expect(gamificationService.addXp).toHaveBeenCalledWith(1, 5, 'SECTION_COMPLETE');
    });

    it('should complete course, update enrollment to 100%, and award course completion XP', async () => {
      repository.findByUserAndLesson.mockResolvedValue(null);
      repository.toggleCompletion.mockResolvedValue({ id: 1, completed: true } as any);

      (prisma.lesson.findUnique as jest.Mock).mockResolvedValue({
        id: 10,
        section: {
          id: 5,
          courseId: 2,
          lessons: [{ id: 10 }],
        },
      });

      // Section check returns 1 completed
      (prisma.lessonCompletion.count as jest.Mock)
        .mockResolvedValueOnce(1) // 1st call: section check
        .mockResolvedValueOnce(1); // 2nd call: course check

      // Sections in course
      (prisma.section.findMany as jest.Mock).mockResolvedValue([
        { id: 5, lessons: [{ id: 10 }] },
      ]);

      const result = await service.toggleLessonCompletion(1, 10);

      expect(result.completed).toBe(true);
      expect(gamificationService.addXp).toHaveBeenCalledWith(1, 30, 'COURSE_COMPLETE');
      expect(prisma.enrollment.update).toHaveBeenCalledWith({
        where: { userId_courseId: { userId: 1, courseId: 2 } },
        data: { completed: true, progress: 100 },
      });
    });
  });

  describe('getLearningAnalytics', () => {
    it('should query learning stats from repository', async () => {
      repository.getLearningAnalytics.mockResolvedValue({ completedLessons: 5, totalTime: 120 } as any);

      const result = await service.getLearningAnalytics(1);

      expect(result.completedLessons).toBe(5);
      expect(repository.getLearningAnalytics).toHaveBeenCalledWith(1);
    });
  });
});
