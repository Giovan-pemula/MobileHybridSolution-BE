import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './order.repository';
import { EnrollmentModule } from '../enrollment/enrollment.module';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [EnrollmentModule, GamificationModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
