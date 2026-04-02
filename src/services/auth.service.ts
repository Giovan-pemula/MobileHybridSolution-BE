import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/user.repository';
import { signToken } from '../utils/jwt';
import { z } from 'zod';
import { loginSchema, registerSchema } from '../validations/auth.validation';

type LoginPayload = z.infer<typeof loginSchema>;
type RegisterPayload = z.infer<typeof registerSchema>;

export class AuthService {
  async login(payload: LoginPayload) {
    const user = await userRepository.findByEmail(payload.email);

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isValidPassword = await bcrypt.compare(payload.password, user.password);

    if (!isValidPassword) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    return {
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  async register(payload: RegisterPayload) {
    const existing = await userRepository.findByEmail(payload.email);

    if (existing) {
      throw new Error('EMAIL_ALREADY_EXISTS');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await userRepository.create({
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

export const authService = new AuthService();
