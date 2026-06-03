import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('dashboard')
  async getDashboard(@CurrentUser() user: CurrentUserPayload) {
    const data = await this.gamificationService.getDashboard(user.id);
    return { data, message: 'Gamification dashboard fetched successfully' };
  }

  @Post('spin')
  async spinGacha(@CurrentUser() user: CurrentUserPayload) {
    const result = await this.gamificationService.spinGacha(user.id);
    return { data: result, message: 'Gacha spin successful' };
  }
}
