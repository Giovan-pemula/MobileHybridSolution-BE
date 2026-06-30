import { Test, TestingModule } from '@nestjs/testing';
import { GamificationService } from '../src/gamification/gamification.service';
import { GamificationRepository } from '../src/gamification/gamification.repository';
import { BadRequestException } from '@nestjs/common';

describe('GamificationService', () => {
  let service: GamificationService;
  let repository: jest.Mocked<GamificationRepository>;

  beforeEach(async () => {
    const mockGamificationRepository = {
      getUserXp: jest.fn(),
      getUserLoginStreak: jest.fn(),
      getUnusedCoupons: jest.fn(),
      getXpHistory: jest.fn(),
      addXp: jest.fn(),
      executeSpinTransaction: jest.fn(),
      updateLoginStreak: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamificationService,
        { provide: GamificationRepository, useValue: mockGamificationRepository },
      ],
    }).compile();

    service = module.get<GamificationService>(GamificationService);
    repository = module.get(GamificationRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDashboard', () => {
    it('should return a user gamification profile dashboard successfully', async () => {
      repository.getUserXp.mockResolvedValue({ xp: 120 } as any);
      repository.getUserLoginStreak.mockResolvedValue({ currentStreak: 3, lastLoginDate: new Date() } as any);
      repository.getUnusedCoupons.mockResolvedValue([{ id: 1, discountPct: 15 }] as any);
      repository.getXpHistory.mockResolvedValue([{ id: 1, amount: 10, activity: 'LOGIN' }] as any);

      const result = await service.getDashboard(1);

      expect(result.xp).toBe(120);
      expect(result.currentStreak).toBe(3);
      expect(result.unusedCoupons).toHaveLength(1);
    });
  });

  describe('spinGacha', () => {
    it('should spin gacha and award coupon if user has sufficient XP', async () => {
      repository.getUserXp.mockResolvedValue({ xp: 150 } as any);
      repository.executeSpinTransaction.mockResolvedValue({ id: 1, discountPct: 20 } as any);

      const result = await service.spinGacha(1);

      expect(result.message).toContain('Congratulations!');
      expect(result.coupon).toBeDefined();
      expect(repository.executeSpinTransaction).toHaveBeenCalled();
    });

    it('should throw BadRequestException if user has insufficient XP', async () => {
      repository.getUserXp.mockResolvedValue({ xp: 50 } as any);

      await expect(service.spinGacha(1)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if atomic transaction fails', async () => {
      repository.getUserXp.mockResolvedValue({ xp: 150 } as any);
      repository.executeSpinTransaction.mockRejectedValue(new Error('DB Error'));

      await expect(service.spinGacha(1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('handleDailyFirstMark', () => {
    it('should increment streak if consecutive day login', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      repository.getUserLoginStreak.mockResolvedValue({ currentStreak: 2, lastLoginDate: yesterday } as any);

      const result = await service.handleDailyFirstMark(1);

      expect(result.currentStreak).toBe(3);
      expect(repository.updateLoginStreak).toHaveBeenCalled();
      expect(repository.addXp).toHaveBeenCalledWith(1, 3, 'LOGIN_STREAK');
    });

    it('should reset streak to 1 if user missed a day', async () => {
      const longAgo = new Date();
      longAgo.setDate(longAgo.getDate() - 3);
      repository.getUserLoginStreak.mockResolvedValue({ currentStreak: 5, lastLoginDate: longAgo } as any);

      const result = await service.handleDailyFirstMark(1);

      expect(result.currentStreak).toBe(1);
      expect(repository.updateLoginStreak).toHaveBeenCalled();
    });

    it('should do nothing and return 0 added XP if already marked today', async () => {
      const today = new Date();
      repository.getUserLoginStreak.mockResolvedValue({ currentStreak: 4, lastLoginDate: today } as any);

      const result = await service.handleDailyFirstMark(1);

      expect(result.addedXp).toBe(0);
      expect(result.currentStreak).toBe(4);
      expect(repository.updateLoginStreak).not.toHaveBeenCalled();
    });
  });
});
