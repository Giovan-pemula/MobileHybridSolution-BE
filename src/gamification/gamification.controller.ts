import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse,
} from '@nestjs/swagger';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@ApiTags('Gamification')
@ApiBearerAuth('access-token')
@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('dashboard')
  @ApiOperation({
    summary: 'Ambil dashboard gamifikasi pengguna yang login',
    description: 'Mengembalikan data gamifikasi: total poin, level saat ini, jumlah spin tersisa, riwayat reward, dan leaderboard.',
  })
  @ApiResponse({ status: 200, description: 'Dashboard gamifikasi berhasil diambil.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async getDashboard(@CurrentUser() user: CurrentUserPayload) {
    const data = await this.gamificationService.getDashboard(user.id);
    return { data, message: 'Gamification dashboard fetched successfully' };
  }

  @Post('spin')
  @ApiOperation({
    summary: 'Lakukan spin gacha untuk mendapatkan reward',
    description: 'Menggunakan 1 spin token untuk mendapatkan hadiah secara acak (poin, badge, dll). Spin token diperoleh dari menyelesaikan lesson.',
  })
  @ApiResponse({ status: 201, description: 'Spin berhasil, reward dikembalikan.' })
  @ApiResponse({ status: 400, description: 'Tidak memiliki spin token yang tersisa.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async spinGacha(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.gamificationService.spinGacha(user.id);
    return { data: result, message: 'Gacha spin successful' };
  }
}
