import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentService } from '../src/enrollment/enrollment.service';
import { EnrollmentRepository } from '../src/enrollment/enrollment.repository';
import { CourseRepository } from '../src/course/course.repository';
import { PrismaService } from '../src/common/prisma/prisma.service';
import { NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';

describe('EnrollmentService', () => {
  let service: EnrollmentService;
  let repository: jest.Mocked<EnrollmentRepository>;
  let courseRepository: jest.Mocked<CourseRepository>;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const mockEnrollmentRepository = {
      findByUser: jest.fn(),
      findByUserAndCourse: jest.fn(),
      create: jest.fn(),
    };

    const mockCourseRepository = {
      findById: jest.fn(),
    };

    const mockPrisma = {
      lesson: { count: jest.fn() },
      lessonCompletion: { count: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentService,
        { provide: EnrollmentRepository, useValue: mockEnrollmentRepository },
        { provide: CourseRepository, useValue: mockCourseRepository },
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<EnrollmentService>(EnrollmentService);
    repository = module.get(EnrollmentRepository);
    courseRepository = module.get(CourseRepository);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMyCourses', () => {
    it('should return user enrollments with progress calculations', async () => {
      const mockEnrollments = [{ id: 1, courseId: 10, userId: 1 }];
      repository.findByUser.mockResolvedValue(mockEnrollments as any);
      
      (prisma.lesson.count as jest.Mock).mockResolvedValue(10);
      (prisma.lessonCompletion.count as jest.Mock).mockResolvedValue(6);

      const result = await service.getMyCourses(1);

      expect(result).toHaveLength(1);
      expect(result[0].progress).toBe(60);
      expect(result[0].completed).toBe(false);
      expect(prisma.lesson.count).toHaveBeenCalled();
    });

    it('should handle zero total lessons gracefully', async () => {
      const mockEnrollments = [{ id: 1, courseId: 10, userId: 1 }];
      repository.findByUser.mockResolvedValue(mockEnrollments as any);
      
      (prisma.lesson.count as jest.Mock).mockResolvedValue(0);
      (prisma.lessonCompletion.count as jest.Mock).mockResolvedValue(0);

      const result = await service.getMyCourses(1);

      expect(result[0].progress).toBe(0);
      expect(result[0].completed).toBe(false);
    });
  });

  describe('enrollInCourse', () => {
    it('should enroll user in a free course successfully', async () => {
      const mockCourse = { id: 10, title: 'Free Course', isFree: true };
      courseRepository.findById.mockResolvedValue(mockCourse as any);
      repository.findByUserAndCourse.mockResolvedValue(null);
      repository.create.mockResolvedValue({ id: 1, userId: 1, courseId: 10 } as any);

      const result = await service.enrollInCourse(1, 10);

      expect(result.courseId).toBe(10);
      expect(repository.create).toHaveBeenCalledWith(1, 10);
    });

    it('should throw NotFoundException if course not found', async () => {
      courseRepository.findById.mockResolvedValue(null);

      await expect(service.enrollInCourse(1, 99)).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if course is not free', async () => {
      const mockCourse = { id: 10, title: 'Paid Course', isFree: false };
      courseRepository.findById.mockResolvedValue(mockCourse as any);

      await expect(service.enrollInCourse(1, 10)).rejects.toThrow(ForbiddenException);
    });

    it('should throw ConflictException if already enrolled', async () => {
      const mockCourse = { id: 10, title: 'Free Course', isFree: true };
      courseRepository.findById.mockResolvedValue(mockCourse as any);
      repository.findByUserAndCourse.mockResolvedValue({ id: 1 } as any);

      await expect(service.enrollInCourse(1, 10)).rejects.toThrow(ConflictException);
    });
  });
});
