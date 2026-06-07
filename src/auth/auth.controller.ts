import { Controller, Post, Body, HttpCode, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { loginSchema, registerSchema, googleMobileLoginSchema } from './auth.validation';
import { z } from 'zod';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtRefreshGuard } from '../common/guards/jwt-refresh.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

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

  @Post('google/mobile')
  @HttpCode(HttpStatus.OK)
  async googleAuthMobile(@Body(new ZodValidationPipe(googleMobileLoginSchema)) body: z.infer<typeof googleMobileLoginSchema>) {
    const result = await this.authService.googleLoginMobile(body.idToken);
    return { data: result, message: 'Google mobile login successful' };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: any) {
    const result = await this.authService.refreshTokens(req.token);
    return { data: result, message: 'Token refreshed successfully' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: CurrentUserPayload) {
    return await this.authService.logout(user.id);
  }
}
