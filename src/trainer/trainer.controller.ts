import { Controller, Get, UseGuards } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@Controller('trainer')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('TRAINER', 'ADMIN')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Get('dashboard')
  async getTrainerDashboard(@CurrentUser() user: CurrentUserPayload) {
    const dashboard = await this.trainerService.getDashboard(user.id);
    return { data: dashboard, message: 'Dashboard fetched successfully' };
  }

  @Get('sales')
  async getTrainerSales(@CurrentUser() user: CurrentUserPayload) {
    const sales = await this.trainerService.getSales(user.id);
    return { data: sales, message: 'Sales data fetched successfully' };
  }
}
