import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthRepository } from './auth.repository';
import { signToken } from '../utils/jwt';
import { z } from 'zod';
import { loginSchema, registerSchema } from '../validations/auth.validation';

type LoginPayload = z.infer<typeof loginSchema>;
type RegisterPayload = z.infer<typeof registerSchema>;

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async login(payload: LoginPayload) {
    const user = await this.authRepository.findByEmail(payload.email);

    if (!user) throw new UnauthorizedException('Wrong email or password');

    const isValidPassword = await bcrypt.compare(payload.password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Wrong email or password');

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return {
      token,
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

    const token = signToken({ id: user.id, email: user.email, role: user.role });
    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }
}
