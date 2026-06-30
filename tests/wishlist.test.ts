import { Test, TestingModule } from '@nestjs/testing';
import { WishlistService } from '../src/wishlist/wishlist.service';
import { WishlistRepository } from '../src/wishlist/wishlist.repository';
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';

describe('WishlistService', () => {
  let service: WishlistService;
  let repository: jest.Mocked<WishlistRepository>;

  beforeEach(async () => {
    const mockWishlistRepository = {
      findByUser: jest.fn(),
      findByUserAndCourse: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WishlistService,
        { provide: WishlistRepository, useValue: mockWishlistRepository },
      ],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
    repository = module.get(WishlistRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getWishlist', () => {
    it('should return user wishlist items', async () => {
      repository.findByUser.mockResolvedValue([{ id: 1, courseId: 10 }] as any);
      const result = await service.getWishlist(1);
      expect(result).toHaveLength(1);
      expect(repository.findByUser).toHaveBeenCalledWith(1);
    });
  });

  describe('addToWishlist', () => {
    it('should add to wishlist if not already added', async () => {
      repository.findByUserAndCourse.mockResolvedValue(null);
      repository.create.mockResolvedValue({ id: 1, courseId: 10 } as any);

      const result = await service.addToWishlist(1, 10);
      expect(result.courseId).toBe(10);
    });

    it('should throw BadRequestException if courseId is invalid', async () => {
      await expect(service.addToWishlist(1, NaN)).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException if already added', async () => {
      repository.findByUserAndCourse.mockResolvedValue({ id: 1 } as any);
      await expect(service.addToWishlist(1, 10)).rejects.toThrow(ConflictException);
    });
  });

  describe('removeFromWishlist', () => {
    it('should remove from wishlist if item exists', async () => {
      repository.findByUserAndCourse.mockResolvedValue({ id: 1 } as any);
      repository.delete.mockResolvedValue({ id: 1 } as any);

      const result = await service.removeFromWishlist(1, 10);
      expect(repository.delete).toHaveBeenCalledWith(1, 10);
    });

    it('should throw NotFoundException if item does not exist', async () => {
      repository.findByUserAndCourse.mockResolvedValue(null);
      await expect(service.removeFromWishlist(1, 10)).rejects.toThrow(NotFoundException);
    });
  });
});
