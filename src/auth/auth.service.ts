import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { AuthRepository } from './auth.repository';
import { signToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { z } from 'zod';
import { loginSchema, registerSchema } from './auth.validation';

type LoginPayload = z.infer<typeof loginSchema>;
type RegisterPayload = z.infer<typeof registerSchema>;

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  private async generateTokens(user: { id: number; email: string; role: string }) {
    const accessToken = signToken({ id: user.id, email: user.email, role: user.role });
    const refreshToken = signRefreshToken({ id: user.id });

    // Hash refresh token before saving to db
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.authRepository.updateRefreshToken(user.id, hashedRefreshToken);

    return { accessToken, refreshToken };
  }

  async login(payload: LoginPayload) {
    const user = await this.authRepository.findByEmail(payload.email);

    if (!user) throw new UnauthorizedException('Wrong email or password');

    const isValidPassword = await bcrypt.compare(payload.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Wrong email or password');

    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  async register(payload: RegisterPayload) {
    const existing = await this.authRepository.findByEmail(payload.email);
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await this.authRepository.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    });

    const tokens = await this.generateTokens(user);

    return {
      ...tokens,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  async googleLogin(reqUser: any) {
    if (!reqUser) {
      throw new UnauthorizedException('No user from google');
    }

    let user = await this.authRepository.findByEmail(reqUser.email);

    if (!user) {
      // Create new user if not exists
      const randomPassword = uuidv4();
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      user = (await this.authRepository.create({
        name: `${reqUser.firstName} ${reqUser.lastName}`.trim() || 'Google User',
        email: reqUser.email,
        password: hashedPassword,
      })) as any; // Cast because create returns specific fields but it's enough for generateTokens
    }

    const tokens = await this.generateTokens(user!);

    return {
      ...tokens,
      user: { id: user!.id, name: user!.name, email: user!.email, role: user!.role },
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = verifyRefreshToken<{ id: number }>(refreshToken);
      const user = await this.authRepository.findById(payload.id);

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const isRefreshTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const tokens = await this.generateTokens(user);

      return {
        ...tokens,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async logout(userId: number) {
    await this.authRepository.updateRefreshToken(userId, null);
    return { message: 'Logged out successfully' };
  }
}
