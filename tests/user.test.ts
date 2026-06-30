import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { UserRepository } from '../src/user/user.repository';
import { R2Service } from '../src/common/storage/r2.service';
import { NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<UserRepository>;
  let r2Service: jest.Mocked<R2Service>;

  beforeEach(async () => {
    const mockUserRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const mockR2Service = {
      uploadFile: jest.fn(),
      deleteFile: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: mockUserRepository },
        { provide: R2Service, useValue: mockR2Service },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
    r2Service = module.get(R2Service);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return paginated users list', async () => {
      userRepository.findAll.mockResolvedValue({ users: [{ id: 1, name: 'Alice' }], total: 1 });
      const result = await service.getAllUsers({ page: '1', limit: '10' });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });
  });

  describe('getUserById', () => {
    it('should return user details successfully', async () => {
      userRepository.findById.mockResolvedValue({ id: 1, name: 'Alice' } as any);
      const result = await service.getUserById(1);
      expect(result.name).toBe('Alice');
    });

    it('should throw NotFoundException if user not found', async () => {
      userRepository.findById.mockResolvedValue(null);
      await expect(service.getUserById(99)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getPublicProfile', () => {
    it('should block admin public profile request', async () => {
      userRepository.findById.mockResolvedValue({ id: 1, role: 'ADMIN' } as any);
      await expect(service.getPublicProfile(1)).rejects.toThrow(ForbiddenException);
    });

    it('should return non-admin user public profile', async () => {
      userRepository.findById.mockResolvedValue({ id: 2, role: 'USER', name: 'Bob' } as any);
      const result = await service.getPublicProfile(2);
      expect(result.name).toBe('Bob');
    });
  });

  describe('updateUser', () => {
    it('should check for email conflicts on update', async () => {
      userRepository.findById.mockResolvedValue({ id: 1, email: 'old@test.com' } as any);
      userRepository.findByEmail.mockResolvedValue({ id: 2, email: 'conflict@test.com' } as any);

      await expect(
        service.updateUser(1, { email: 'conflict@test.com' }),
      ).rejects.toThrow(ConflictException);
    });

    it('should update profile fields successfully', async () => {
      userRepository.findById.mockResolvedValue({ id: 1, email: 'test@test.com' } as any);
      userRepository.update.mockResolvedValue({ id: 1, name: 'Bob' } as any);

      const result = await service.updateUser(1, { name: 'Bob' });
      expect(result.name).toBe('Bob');
    });
  });

  describe('uploadAvatar', () => {
    it('should delete old avatar and upload a new one', async () => {
      userRepository.findById.mockResolvedValue({ id: 1, avatar: 'old-avatar.png' } as any);
      r2Service.deleteFile.mockResolvedValue(undefined);
      r2Service.uploadFile.mockResolvedValue('new-avatar.png');
      userRepository.update.mockResolvedValue({ id: 1, avatar: 'new-avatar.png' } as any);

      const result = await service.uploadAvatar(1, { buffer: Buffer.from('img') } as any);

      expect(result.avatar).toBe('new-avatar.png');
      expect(r2Service.deleteFile).toHaveBeenCalledWith('old-avatar.png');
      expect(r2Service.uploadFile).toHaveBeenCalledWith({ buffer: Buffer.from('img') }, 'avatars');
    });
  });
});
