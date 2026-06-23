import { Controller, Get, Post, Body, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiProperty,
} from '@nestjs/swagger';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createOrderSchema } from './order.validation';
import { z } from 'zod';

class CreateOrderDto {
  @ApiProperty({ example: [1, 2], description: 'Array ID kursus yang ingin dibeli', type: [Number] })
  courseIds: number[];
  @ApiProperty({ example: 'DISC10', description: 'Kode kupon diskon (opsional)', required: false })
  couponId?: string;
}

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Ambil riwayat order pengguna yang login' })
  @ApiResponse({ status: 200, description: 'Daftar order berhasil diambil.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async getOrders(@CurrentUser() user: CurrentUserPayload) {
    const orders = await this.orderService.getOrders(user.id);
    return { data: orders, message: 'Orders fetched successfully' };
  }

  @Get('admin/revenue')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '[ADMIN] Ambil semua order beserta data revenue' })
  @ApiResponse({ status: 200, description: 'Data revenue berhasil diambil.' })
  @ApiResponse({ status: 403, description: 'Akses ditolak, bukan ADMIN.' })
  async getAllOrdersWithRevenue() {
    const orders = await this.orderService.getAllOrdersForAdmin();
    return { data: orders, message: 'Admin orders with revenue fetched successfully' };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Buat order baru (checkout kursus berbayar)', description: 'Membuat pesanan untuk satu atau lebih kursus berbayar. Mengembalikan Midtrans payment token untuk proses pembayaran di frontend.' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Order berhasil dibuat, payment token dari Midtrans dikembalikan.' })
  @ApiResponse({ status: 401, description: 'Token tidak valid.' })
  async createOrder(
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createOrderSchema)) body: z.infer<typeof createOrderSchema>,
  ) {
    const order = await this.orderService.createOrder(user.id, body.courseIds, body.couponId);
    return { data: order, message: 'Order created successfully' };
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Midtrans payment webhook', description: 'Endpoint untuk menerima notifikasi status pembayaran dari Midtrans secara otomatis. **Tidak memerlukan autentikasi.**' })
  @ApiResponse({ status: 200, description: 'Webhook berhasil diproses.' })
  async handleWebhook(@Body() payload: any) {
    const result = await this.orderService.handleWebhook(payload);
    return { data: result, message: 'Webhook processed successfully' };
  }

  @Get(':id/payment-status')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Cek & sinkronisasi status pembayaran order', description: 'Mensinkronkan status order dengan Midtrans dan mengembalikan status terbaru.' })
  @ApiParam({ name: 'id', description: 'ID order' })
  @ApiResponse({ status: 200, description: 'Status pembayaran berhasil diambil.' })
  async getPaymentStatus(
    @CurrentUser() user: CurrentUserPayload,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    const order = await this.orderService.syncPaymentStatus(user.id, orderId);
    return { data: order, message: 'Payment status fetched successfully' };
  }
}
