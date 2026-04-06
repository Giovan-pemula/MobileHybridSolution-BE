import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { loginSchema, registerSchema } from '../validations/auth.validation';
import { z } from 'zod';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(new ZodValidationPipe(loginSchema)) body: z.infer<typeof loginSchema>) {
    const result = await this.authService.login(body);
    return { data: result, message: 'Login successful' };
  }

  @Post('register')
  async register(@Body(new ZodValidationPipe(registerSchema)) body: z.infer<typeof registerSchema>) {
    const result = await this.authService.register(body);
    return { data: result, message: 'Registration successful' };
  }
}
