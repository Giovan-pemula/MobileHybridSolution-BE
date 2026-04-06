import { Module } from '@nestjs/common';
import { TrainerRequestController } from './trainer-request.controller';
import { TrainerRequestService } from './trainer-request.service';
import { TrainerRequestRepository } from './trainer-request.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TrainerRequestController],
  providers: [TrainerRequestService, TrainerRequestRepository],
})
export class TrainerRequestModule {}
