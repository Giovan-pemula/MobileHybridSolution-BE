import { Controller, Post, Body, HttpCode, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags, ApiOperation, ApiBody, ApiResponse, ApiProperty, ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { loginSchema, registerSchema, googleMobileLoginSchema } from './auth.validation';
import { z } from 'zod';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { JwtRefreshGuard } from '../common/guards/jwt-refresh.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

class LoginDto {
  @ApiProperty({ example: 'user@example.com' }) email: string;
  @ApiProperty({ example: 'password123' })      password: string;
}

class RegisterDto {
  @ApiProperty({ example: 'John Doe' })         name: string;
  @ApiProperty({ example: 'user@example.com' }) email: string;
  @ApiProperty({ example: 'password123', description: 'Minimal 6 karakter' }) password: string;
}

class GoogleMobileDto {
  @ApiProperty({ description: 'Google ID Token dari Flutter/React Native' }) idToken: string;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login dengan email & password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login berhasil, mengembalikan accessToken & refreshToken.' })
  @ApiResponse({ status: 401, description: 'Email atau password salah.' })
  async login(@Body(new ZodValidationPipe(loginSchema)) body: z.infer<typeof loginSchema>) {
    const result = await this.authService.login(body);
    return { data: result, message: 'Login successful' };
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrasi akun baru' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Akun berhasil dibuat.' })
  @ApiResponse({ status: 409, description: 'Email sudah terdaftar.' })
  async register(@Body(new ZodValidationPipe(registerSchema)) body: z.infer<typeof registerSchema>) {
    const result = await this.authService.register(body);
    return { data: result, message: 'Registration successful' };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Redirect ke Google OAuth (tidak bisa ditest di Swagger)' })
  @ApiResponse({ status: 302, description: 'Redirect ke Google consent screen.' })
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ summary: 'Google OAuth callback (dipanggil otomatis oleh Google)' })
  @ApiResponse({ status: 200, description: 'Login Google berhasil.' })
  async googleAuthRedirect(@Req() req: any) {
    const result = await this.authService.googleLogin(req.user);
    return { data: result, message: 'Google login successful' };
  }

  @Post('google/mobile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login Google untuk aplikasi Mobile (Flutter/React Native)', description: 'Mengirim Google ID Token yang diperoleh dari SDK Google Sign-In di aplikasi mobile.' })
  @ApiBody({ type: GoogleMobileDto })
  @ApiResponse({ status: 200, description: 'Login berhasil.' })
  @ApiResponse({ status: 401, description: 'ID Token tidak valid.' })
  async googleAuthMobile(@Body(new ZodValidationPipe(googleMobileLoginSchema)) body: z.infer<typeof googleMobileLoginSchema>) {
    const result = await this.authService.googleLoginMobile(body.idToken);
    return { data: result, message: 'Google mobile login successful' };
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Refresh access token', description: 'Kirim refresh token di header Authorization: Bearer <refreshToken>.' })
  @ApiResponse({ status: 200, description: 'Access token baru berhasil dibuat.' })
  @ApiResponse({ status: 401, description: 'Refresh token tidak valid atau kedaluwarsa.' })
  async refresh(@Req() req: any) {
    const result = await this.authService.refreshTokens(req.token);
    return { data: result, message: 'Token refreshed successfully' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Logout pengguna', description: 'Menghapus refresh token dari database. Membutuhkan access token yang valid.' })
  @ApiResponse({ status: 200, description: 'Logout berhasil.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async logout(@CurrentUser() user: CurrentUserPayload) {
    return await this.authService.logout(user.id);
  }
}
