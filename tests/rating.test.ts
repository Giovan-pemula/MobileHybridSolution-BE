import { Test, TestingModule } from '@nestjs/testing';
import { RatingService } from '../src/rating/rating.service';
import { RatingRepository } from '../src/rating/rating.repository';
import { NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';

describe('RatingService', () => {
  let service: RatingService;
  let repository: jest.Mocked<RatingRepository>;

  beforeEach(async () => {
    const mockRatingRepository = {
      findByCourse: jest.fn(),
      findByUserAndCourse: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RatingService,
        { provide: RatingRepository, useValue: mockRatingRepository },
      ],
    }).compile();

    service = module.get<RatingService>(RatingService);
    repository = module.get(RatingRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCourseRatings', () => {
    it('should return course ratings list', async () => {
      repository.findByCourse.mockResolvedValue([{ id: 1, rating: 5 }] as any);
      const result = await service.getCourseRatings(10);
      expect(result).toHaveLength(1);
      expect(repository.findByCourse).toHaveBeenCalledWith(10);
    });
  });

  describe('createRating', () => {
    it('should create rating successfully if not already rated', async () => {
      repository.findByUserAndCourse.mockResolvedValue(null);
      repository.create.mockResolvedValue({ id: 1, rating: 4 } as any);

      const result = await service.createRating(1, 10, { rating: 4, review: 'Good' });
      expect(result.id).toBe(1);
      expect(repository.create).toHaveBeenCalledWith({ userId: 1, courseId: 10, rating: 4, review: 'Good' });
    });

    it('should throw ConflictException if already rated', async () => {
      repository.findByUserAndCourse.mockResolvedValue({ id: 1 } as any);
      await expect(service.createRating(1, 10, { rating: 4 })).rejects.toThrow(ConflictException);
    });
  });

  describe('updateRating', () => {
    it('should update rating successfully if owner edits', async () => {
      repository.findById.mockResolvedValue({ id: 1, userId: 5, rating: 3 } as any);
      repository.update.mockResolvedValue({ id: 1, rating: 5 } as any);

      const result = await service.updateRating(1, 5, { rating: 5 });
      expect(result.rating).toBe(5);
    });

    it('should throw ForbiddenException if editor is not owner', async () => {
      repository.findById.mockResolvedValue({ id: 1, userId: 5 } as any);
      await expect(service.updateRating(1, 99, { rating: 5 })).rejects.toThrow(ForbiddenException);
    });
  });

  describe('deleteRating', () => {
    it('should delete rating successfully', async () => {
      repository.findById.mockResolvedValue({ id: 1, userId: 5 } as any);
      repository.delete.mockResolvedValue({ id: 1 } as any);

      const result = await service.deleteRating(1, 5);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
