import bcrypt from 'bcryptjs';
import { adminRepository } from '../repositories/admin.repository';
import { signToken } from '../utils/jwt';
import { z } from 'zod';
import { loginSchema } from '../validations/auth.validation';

type LoginPayload = z.infer<typeof loginSchema>;

export class AuthService {
  async loginAdmin(payload: LoginPayload) {
    const admin = await adminRepository.findByEmail(payload.email);

    if (!admin) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isValidPassword = await bcrypt.compare(payload.password, admin.password);

    if (!isValidPassword) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const token = signToken({ id: admin.id, email: admin.email });

    return { token, user: { id: admin.id, email: admin.email } };
  }
}

export const authService = new AuthService();
