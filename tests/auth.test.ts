import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { AuthRepository } from '../src/auth/auth.repository';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('../src/utils/jwt', () => ({
  signToken: jest.fn().mockReturnValue('mock-access-token'),
  signRefreshToken: jest.fn().mockReturnValue('mock-refresh-token'),
  verifyRefreshToken: jest.fn().mockReturnValue({ id: 1 }),
}));

jest.mock('google-auth-library', () => {
  return {
    OAuth2Client: jest.fn().mockImplementation(() => {
      return {
        verifyIdToken: jest.fn().mockResolvedValue({
          getPayload: () => ({
            email: 'google@example.com',
            given_name: 'Google',
            family_name: 'User',
          }),
        }),
      };
    }),
  };
});

describe('AuthService', () => {
  let service: AuthService;
  let repository: jest.Mocked<AuthRepository>;

  beforeEach(async () => {
    const mockAuthRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      updateRefreshToken: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: mockAuthRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get(AuthRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should login successfully with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashed-password',
        role: 'USER',
        name: 'Test User',
      };
      repository.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login({ email: 'test@example.com', password: 'password123' });

      expect(result.accessToken).toBe('mock-access-token');
      expect(result.refreshToken).toBe('mock-refresh-token');
      expect(result.user.email).toBe('test@example.com');
      expect(repository.findByEmail).toHaveBeenCalledWith('test@example.com');
    });

    it('should throw UnauthorizedException if user not found', async () => {
      repository.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({ email: 'wrong@example.com', password: 'password' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const mockUser = { id: 1, email: 'test@example.com', password: 'hashed-password', role: 'USER' };
      repository.findByEmail.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.login({ email: 'test@example.com', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      repository.findByEmail.mockResolvedValue(null);
      const mockUser = { id: 1, name: 'New User', email: 'new@example.com', role: 'USER' };
      repository.create.mockResolvedValue(mockUser as any);
      (bcrypt.hash as jest.Mock).mockResolvedValue('new-hash');

      const result = await service.register({
        name: 'New User',
        email: 'new@example.com',
        password: 'password123',
      });

      expect(result.accessToken).toBe('mock-access-token');
      expect(result.user.name).toBe('New User');
      expect(repository.create).toHaveBeenCalled();
    });

    it('should throw ConflictException if email is already registered', async () => {
      repository.findByEmail.mockResolvedValue({ id: 1 } as any);

      await expect(
        service.register({ name: 'User', email: 'exists@example.com', password: 'pass' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('googleLogin', () => {
    it('should login an existing google user', async () => {
      const mockUser = { id: 2, name: 'Google User', email: 'google@example.com', role: 'USER' };
      repository.findByEmail.mockResolvedValue(mockUser as any);

      const result = await service.googleLogin({
        email: 'google@example.com',
        firstName: 'Google',
        lastName: 'User',
      });

      expect(result.accessToken).toBe('mock-access-token');
      expect(result.user.id).toBe(2);
    });

    it('should register a new google user if not exists', async () => {
      repository.findByEmail.mockResolvedValue(null);
      const mockUser = { id: 3, name: 'New Google User', email: 'google@example.com', role: 'USER' };
      repository.create.mockResolvedValue(mockUser as any);
      (bcrypt.hash as jest.Mock).mockResolvedValue('random-hash');

      const result = await service.googleLogin({
        email: 'google@example.com',
        firstName: 'New Google',
        lastName: 'User',
      });

      expect(result.user.id).toBe(3);
      expect(repository.create).toHaveBeenCalled();
    });

    it('should throw UnauthorizedException if reqUser is missing', async () => {
      await expect(service.googleLogin(null)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('googleLoginMobile', () => {
    it('should login google user on mobile device successfully', async () => {
      const mockUser = { id: 4, name: 'Google User', email: 'google@example.com', role: 'USER' };
      repository.findByEmail.mockResolvedValue(mockUser as any);

      const result = await service.googleLoginMobile('google-id-token');

      expect(result.user.email).toBe('google@example.com');
    });

    it('should throw UnauthorizedException if token verification fails', async () => {
      const clientMock = require('google-auth-library').OAuth2Client;
      clientMock.mockImplementationOnce(() => {
        return {
          verifyIdToken: jest.fn().mockRejectedValue(new Error('Invalid token')),
        };
      });

      await expect(service.googleLoginMobile('bad-token')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refreshTokens', () => {
    it('should refresh tokens successfully with valid refresh token', async () => {
      const mockUser = { id: 1, email: 'test@example.com', role: 'USER', refreshToken: 'hashed-refresh-token' };
      repository.findById.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.refreshTokens('mock-refresh-token');

      expect(result.accessToken).toBe('mock-access-token');
      expect(result.refreshToken).toBe('mock-refresh-token');
    });

    it('should throw UnauthorizedException if refresh token is invalid', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.refreshTokens('invalid')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if refresh token compare returns false', async () => {
      const mockUser = { id: 1, email: 'test@example.com', role: 'USER', refreshToken: 'hashed-refresh-token' };
      repository.findById.mockResolvedValue(mockUser as any);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.refreshTokens('wrong-refresh-token')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should clear refresh token on logout', async () => {
      repository.updateRefreshToken.mockResolvedValue({} as any);

      const result = await service.logout(1);

      expect(result.message).toBe('Logged out successfully');
      expect(repository.updateRefreshToken).toHaveBeenCalledWith(1, null);
    });
  });
});
