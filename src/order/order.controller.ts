import { Controller, Get, Post, Body, UseGuards, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createOrderSchema } from './order.validation';
import { z } from 'zod';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getOrders(@CurrentUser() user: CurrentUserPayload) {
    const orders = await this.orderService.getOrders(user.id);
    return { data: orders, message: 'Orders fetched successfully' };
  }

  @Get('admin/revenue')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getAllOrdersWithRevenue() {
    const orders = await this.orderService.getAllOrdersForAdmin();
    return { data: orders, message: 'Admin orders with revenue fetched successfully' };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createOrderSchema)) body: z.infer<typeof createOrderSchema>,
  ) {
    const order = await this.orderService.createOrder(user.id, body.courseIds, body.couponId);
    return { data: order, message: 'Order created successfully' };
  }

  @Post('webhook')
  async handleWebhook(@Body() payload: any) {
    const result = await this.orderService.handleWebhook(payload);
    return { data: result, message: 'Webhook processed successfully' };
  }

  @Get(':id/payment-status')
  @UseGuards(JwtAuthGuard)
  async getPaymentStatus(
    @CurrentUser() user: CurrentUserPayload,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    const order = await this.orderService.syncPaymentStatus(user.id, orderId);
    return { data: order, message: 'Payment status fetched successfully' };
  }
}
