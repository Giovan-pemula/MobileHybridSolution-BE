import { Test, TestingModule } from '@nestjs/testing';
import { TrainerRequestService } from '../src/trainer-request/trainer-request.service';
import { TrainerRequestRepository } from '../src/trainer-request/trainer-request.repository';
import { UserRepository } from '../src/user/user.repository';
import { R2Service } from '../src/common/storage/r2.service';
import { NotFoundException, ConflictException } from '@nestjs/common';

describe('TrainerRequestService', () => {
  let service: TrainerRequestService;
  let repository: jest.Mocked<TrainerRequestRepository>;
  let userRepository: jest.Mocked<UserRepository>;
  let r2Service: jest.Mocked<R2Service>;

  beforeEach(async () => {
    const mockTrainerRequestRepository = {
      findByUserId: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateStatus: jest.fn(),
    };

    const mockUserRepository = {
      update: jest.fn(),
    };

    const mockR2Service = {
      uploadFile: jest.fn(),
      deleteFile: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainerRequestService,
        { provide: TrainerRequestRepository, useValue: mockTrainerRequestRepository },
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: R2Service, useValue: mockR2Service },
      ],
    }).compile();

    service = module.get<TrainerRequestService>(TrainerRequestService);
    repository = module.get(TrainerRequestRepository);
    userRepository = module.get(UserRepository);
    r2Service = module.get(R2Service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('submitRequest', () => {
    it('should submit request successfully if user has no pending requests', async () => {
      repository.findByUserId.mockResolvedValue(null);
      r2Service.uploadFile.mockResolvedValue('cv-url.pdf');
      repository.create.mockResolvedValue({ id: 1, cvUrl: 'cv-url.pdf', status: 'PENDING' } as any);

      const mockFile = { buffer: Buffer.from('cv') } as any;
      const result = await service.submitRequest(1, { bio: 'Bio', experience: 'Exp' }, mockFile);

      expect(result.cvUrl).toBe('cv-url.pdf');
      expect(repository.create).toHaveBeenCalledWith({
        userId: 1,
        cvUrl: 'cv-url.pdf',
        bio: 'Bio',
        experience: 'Exp',
      });
    });

    it('should throw ConflictException if request already exists', async () => {
      repository.findByUserId.mockResolvedValue({ id: 1 } as any);
      await expect(service.submitRequest(1, { bio: 'Bio', experience: 'Exp' }, {} as any)).rejects.toThrow(ConflictException);
    });
  });

  describe('getAllRequests', () => {
    it('should query requests list', async () => {
      repository.findAll.mockResolvedValue([{ id: 1 }] as any);
      const result = await service.getAllRequests('PENDING');
      expect(result).toHaveLength(1);
    });
  });

  describe('verifyTrainer', () => {
    it('should approve request and update user role to TRAINER', async () => {
      repository.findById.mockResolvedValue({ id: 1, userId: 10, status: 'PENDING' } as any);
      repository.updateStatus.mockResolvedValue({ id: 1, status: 'APPROVED' } as any);

      const result = await service.verifyTrainer(1, 'APPROVED');

      expect(result.status).toBe('APPROVED');
      expect(userRepository.update).toHaveBeenCalledWith(10, { role: 'TRAINER' });
    });

    it('should reject request without changing user role', async () => {
      repository.findById.mockResolvedValue({ id: 1, userId: 10, status: 'PENDING' } as any);
      repository.updateStatus.mockResolvedValue({ id: 1, status: 'REJECTED' } as any);

      const result = await service.verifyTrainer(1, 'REJECTED');

      expect(result.status).toBe('REJECTED');
      expect(userRepository.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException if request not found', async () => {
      repository.findById.mockResolvedValue(null);
      await expect(service.verifyTrainer(99, 'APPROVED')).rejects.toThrow(NotFoundException);
    });

    it('should throw ConflictException if request is not PENDING', async () => {
      repository.findById.mockResolvedValue({ id: 1, status: 'APPROVED' } as any);
      await expect(service.verifyTrainer(1, 'APPROVED')).rejects.toThrow(ConflictException);
    });
  });
});
