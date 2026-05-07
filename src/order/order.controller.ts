import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { createOrderSchema } from './order.validation';
import { z } from 'zod';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getOrders(@CurrentUser() user: CurrentUserPayload) {
    const orders = await this.orderService.getOrders(user.id);
    return { data: orders, message: 'Orders fetched successfully' };
  }

  @Post()
  async createOrder(
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(createOrderSchema)) body: z.infer<typeof createOrderSchema>,
  ) {
    const order = await this.orderService.createOrder(user.id, body.courseIds);
    return { data: order, message: 'Order created successfully' };
  }
}
