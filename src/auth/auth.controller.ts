import { Controller, Post, Body, HttpCode, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { loginSchema, registerSchema } from './auth.validation';
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

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {
    const result = await this.authService.googleLogin(req.user);
    return { data: result, message: 'Google login successful' };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      return { message: 'Refresh token is required', statusCode: 400 };
    }
    const result = await this.authService.refreshTokens(refreshToken);
    return { data: result, message: 'Token refreshed successfully' };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body('userId') userId: number) {
    if (!userId) {
      return { message: 'User ID is required', statusCode: 400 };
    }
    return await this.authService.logout(userId);
  }
}
