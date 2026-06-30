import { Test, TestingModule } from '@nestjs/testing';
import { TrainerService } from '../src/trainer/trainer.service';
import { TrainerRepository } from '../src/trainer/trainer.repository';

describe('TrainerService', () => {
  let service: TrainerService;
  let repository: jest.Mocked<TrainerRepository>;

  beforeEach(async () => {
    const mockTrainerRepository = {
      getDashboard: jest.fn(),
      getSales: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainerService,
        { provide: TrainerRepository, useValue: mockTrainerRepository },
      ],
    }).compile();

    service = module.get<TrainerService>(TrainerService);
    repository = module.get(TrainerRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDashboard', () => {
    it('should query dashboard metrics', async () => {
      repository.getDashboard.mockResolvedValue({ totalStudents: 100, totalRevenue: 1000000 } as any);
      const result = await service.getDashboard(5);
      expect(result.totalStudents).toBe(100);
      expect(repository.getDashboard).toHaveBeenCalledWith(5);
    });
  });

  describe('getSales', () => {
    it('should query sales history', async () => {
      repository.getSales.mockResolvedValue([{ id: 1, courseTitle: 'Web Dev 101' }] as any);
      const result = await service.getSales(5);
      expect(result).toHaveLength(1);
      expect(repository.getSales).toHaveBeenCalledWith(5);
    });
  });
});
