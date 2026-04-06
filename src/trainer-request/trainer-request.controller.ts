import {
  Controller, Post, Get, Patch, Param, Body, Query, ParseIntPipe, UseGuards,
} from '@nestjs/common';
import { TrainerRequestService } from './trainer-request.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser, CurrentUserPayload } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { trainerRequestSchema, verifyTrainerSchema } from '../validations/trainerRequest.validation';
import { z } from 'zod';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class TrainerRequestController {
  constructor(private readonly trainerRequestService: TrainerRequestService) {}

  @Post('trainer/request')
  async submitTrainerRequest(
    @CurrentUser() user: CurrentUserPayload,
    @Body(new ZodValidationPipe(trainerRequestSchema)) body: z.infer<typeof trainerRequestSchema>,
  ) {
    const request = await this.trainerRequestService.submitRequest(user.id, body);
    return { data: request, message: 'Trainer request submitted' };
  }

  @Get('admin/trainer-requests')
  @Roles('ADMIN')
  async getTrainerRequests(@Query('status') status?: string) {
    const requests = await this.trainerRequestService.getAllRequests(status);
    return { data: requests, message: 'Trainer requests fetched successfully' };
  }

  @Patch('admin/trainer/:id/verify')
  @Roles('ADMIN')
  async verifyTrainer(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(verifyTrainerSchema)) body: z.infer<typeof verifyTrainerSchema>,
  ) {
    const result = await this.trainerRequestService.verifyTrainer(id, body.status);
    return { data: result, message: `Trainer request ${body.status.toLowerCase()}` };
  }
}
