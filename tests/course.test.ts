import { Test, TestingModule } from '@nestjs/testing';
import { CourseService } from '../src/course/course.service';
import { CourseRepository } from '../src/course/course.repository';
import { R2Service } from '../src/common/storage/r2.service';
import { PrismaService } from '../src/common/prisma/prisma.service';
import { NotFoundException, ForbiddenException } from '@nestjs/common';

describe('CourseService', () => {
  let service: CourseService;
  let repository: jest.Mocked<CourseRepository>;
  let prisma: jest.Mocked<PrismaService>;
  let r2Service: jest.Mocked<R2Service>;

  beforeEach(async () => {
    const mockCourseRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      getStudents: jest.fn(),
    };

    const mockPrisma = {
      enrollment: {
        findUnique: jest.fn(),
      },
    };

    const mockR2Service = {
      uploadFile: jest.fn(),
      deleteFile: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CourseService,
        { provide: CourseRepository, useValue: mockCourseRepository },
        { provide: PrismaService, useValue: mockPrisma },
        { provide: R2Service, useValue: mockR2Service },
      ],
    }).compile();

    service = module.get<CourseService>(CourseService);
    repository = module.get(CourseRepository);
    prisma = module.get(PrismaService);
    r2Service = module.get(R2Service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllCourses', () => {
    it('should return paginated courses', async () => {
      const mockResult = { courses: [{ id: 1, title: 'Course 1', status: 'PUBLISHED' }], total: 1 };
      repository.findAll.mockResolvedValue(mockResult as any);

      const result = await service.getAllCourses({ page: '1', limit: '10', search: 'test', isFree: 'true' });

      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
      expect(repository.findAll).toHaveBeenCalledWith(0, 10, {
        search: 'test',
        isFree: true,
        status: 'PUBLISHED',
      });
    });
  });

  describe('getAllCoursesForAdmin', () => {
    it('should query all courses with admin filters', async () => {
      const mockResult = { courses: [{ id: 1, title: 'Course 1', status: 'DRAFT' }], total: 1 };
      repository.findAll.mockResolvedValue(mockResult as any);

      const result = await service.getAllCoursesForAdmin({
        page: '1',
        limit: '10',
        categoryId: '2',
        isFree: 'false',
        status: 'DRAFT',
        trainerId: '5',
      });

      expect(result.data).toHaveLength(1);
      expect(repository.findAll).toHaveBeenCalledWith(0, 10, {
        categoryId: 2,
        isFree: false,
        status: 'DRAFT',
        trainerId: 5,
      });
    });
  });

  describe('getCourseById', () => {
    it('should return a published course successfully', async () => {
      const mockCourse = { id: 1, title: 'Course 1', status: 'PUBLISHED', ratings: [{ rating: 5 }, { rating: 4 }] };
      repository.findById.mockResolvedValue(mockCourse as any);

      const result = await service.getCourseById(1);

      expect(result.averageRating).toBe(4.5);
      expect(result.title).toBe('Course 1');
    });

    it('should throw NotFoundException if course does not exist', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.getCourseById(99)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if course is DRAFT or ARCHIVED', async () => {
      const mockCourse = { id: 1, title: 'Course 1', status: 'DRAFT', ratings: [] };
      repository.findById.mockResolvedValue(mockCourse as any);

      await expect(service.getCourseById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getCourseByIdForEnrolled', () => {
    it('should allow access to ARCHIVED course if user is enrolled', async () => {
      const mockCourse = { id: 1, title: 'Course 1', status: 'ARCHIVED', ratings: [] };
      repository.findById.mockResolvedValue(mockCourse as any);
      (prisma.enrollment.findUnique as jest.Mock).mockResolvedValue({ userId: 10, courseId: 1 });

      const result = await service.getCourseByIdForEnrolled(1, 10);

      expect(result.title).toBe('Course 1');
    });

    it('should throw NotFoundException for ARCHIVED course if user is NOT enrolled', async () => {
      const mockCourse = { id: 1, title: 'Course 1', status: 'ARCHIVED', ratings: [] };
      repository.findById.mockResolvedValue(mockCourse as any);
      (prisma.enrollment.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.getCourseByIdForEnrolled(1, 10)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createCourse', () => {
    it('should invoke repository.create with trainerId', async () => {
      repository.create.mockResolvedValue({ id: 1, title: 'New Course' } as any);

      const result = await service.createCourse(5, { title: 'New Course' });

      expect(result.id).toBe(1);
      expect(repository.create).toHaveBeenCalledWith({ title: 'New Course', trainerId: 5 });
    });
  });

  describe('updateCourse', () => {
    it('should allow ADMIN to update any course', async () => {
      repository.findById.mockResolvedValue({ id: 1, trainerId: 5 } as any);
      repository.update.mockResolvedValue({ id: 1, title: 'Updated' } as any);

      const result = await service.updateCourse(1, 10, 'ADMIN', { title: 'Updated' });

      expect(result.title).toBe('Updated');
    });

    it('should allow TRAINER to update their own course', async () => {
      repository.findById.mockResolvedValue({ id: 1, trainerId: 5 } as any);
      repository.update.mockResolvedValue({ id: 1, title: 'Updated' } as any);

      const result = await service.updateCourse(1, 5, 'TRAINER', { title: 'Updated' });

      expect(result.title).toBe('Updated');
    });

    it('should throw ForbiddenException if TRAINER updates someone else\'s course', async () => {
      repository.findById.mockResolvedValue({ id: 1, trainerId: 5 } as any);

      await expect(
        service.updateCourse(1, 6, 'TRAINER', { title: 'Updated' }),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('deleteCourse', () => {
    it('should allow trainer to delete their own course', async () => {
      repository.findById.mockResolvedValue({ id: 1, trainerId: 5 } as any);
      repository.delete.mockResolvedValue({ id: 1 } as any);

      const result = await service.deleteCourse(1, 5, 'TRAINER');

      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('getCourseStudents', () => {
    it('should allow trainer of the course to fetch students list', async () => {
      repository.findById.mockResolvedValue({ id: 1, trainerId: 5 } as any);
      repository.getStudents.mockResolvedValue({ enrollments: [{ id: 1, userId: 10 }], total: 1 } as any);

      const result = await service.getCourseStudents(1, { page: '1', limit: '10' }, 5, 'TRAINER');

      expect(result.data).toHaveLength(1);
      expect(repository.getStudents).toHaveBeenCalledWith(1, 0, 10);
    });

    it('should throw ForbiddenException if another trainer tries to fetch students list', async () => {
      repository.findById.mockResolvedValue({ id: 1, trainerId: 5 } as any);

      await expect(
        service.getCourseStudents(1, { page: '1' }, 6, 'TRAINER'),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('uploadThumbnail', () => {
    it('should upload a thumbnail and delete the old one if it exists', async () => {
      repository.findById.mockResolvedValue({ id: 1, trainerId: 5, thumbnail: 'old-thumb.png' } as any);
      r2Service.deleteFile.mockResolvedValue(undefined);
      r2Service.uploadFile.mockResolvedValue('new-thumb.png');
      repository.update.mockResolvedValue({ id: 1, thumbnail: 'new-thumb.png' } as any);

      const mockFile = {
        fieldname: 'file',
        originalname: 'test.png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer: Buffer.from('test'),
        size: 4,
      } as any;

      const result = await service.uploadThumbnail(1, 5, 'TRAINER', mockFile);

      expect(result.thumbnail).toBe('new-thumb.png');
      expect(r2Service.deleteFile).toHaveBeenCalledWith('old-thumb.png');
      expect(r2Service.uploadFile).toHaveBeenCalledWith(mockFile, 'thumbnails');
    });
  });
});
