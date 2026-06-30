import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse,
} from '@nestjs/swagger';
import { TrainerService } from './trainer.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';

@ApiTags('Trainer')
@ApiBearerAuth('access-token')
@Controller('trainer')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('TRAINER', 'ADMIN')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Get('dashboard')
  @ApiOperation({
    summary: '[TRAINER/ADMIN] Ambil ringkasan dashboard trainer',
    description: 'Mengembalikan statistik kursus yang dimiliki trainer: jumlah kursus, total siswa, total pendapatan, dan rating rata-rata.',
  })
  @ApiResponse({ status: 200, description: 'Data dashboard berhasil diambil.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, bukan TRAINER atau ADMIN.' })
  async getTrainerDashboard(@CurrentUser() user: CurrentUserPayload) {
    const dashboard = await this.trainerService.getDashboard(user.id);
    return { data: dashboard, message: 'Dashboard fetched successfully' };
  }

  @Get('sales')
  @ApiOperation({
    summary: '[TRAINER/ADMIN] Ambil laporan penjualan kursus trainer',
    description: 'Mengembalikan riwayat transaksi dan data pendapatan dari seluruh kursus yang dimiliki trainer.',
  })
  @ApiResponse({ status: 200, description: 'Data penjualan berhasil diambil.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak.' })
  async getTrainerSales(@CurrentUser() user: CurrentUserPayload) {
    const sales = await this.trainerService.getSales(user.id);
    return { data: sales, message: 'Sales data fetched successfully' };
  }
}
