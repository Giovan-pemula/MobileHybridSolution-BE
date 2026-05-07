import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { TrainerRequestRepository } from './trainer-request.repository';
import { UserRepository } from '../user/user.repository';
import { R2Service } from '../common/storage/r2.service';

@Injectable()
export class TrainerRequestService {
  constructor(
    private readonly trainerRequestRepository: TrainerRequestRepository,
    private readonly userRepository: UserRepository,
    private readonly r2Service: R2Service,
  ) {}

  async submitRequest(
    userId: number,
    data: { bio: string; experience: string },
    cvFile: Express.Multer.File,
  ) {
    const existing = await this.trainerRequestRepository.findByUserId(userId);
    if (existing) throw new ConflictException('You already have a pending request');

    // Upload CV PDF to R2
    const cvUrl = await this.r2Service.uploadFile(cvFile, 'cv-documents');

    return this.trainerRequestRepository.create({ userId, cvUrl, ...data });
  }

  async getAllRequests(status?: string) {
    return this.trainerRequestRepository.findAll(status);
  }

  async verifyTrainer(requestId: number, status: string) {
    const request = await this.trainerRequestRepository.findById(requestId);
    if (!request) throw new NotFoundException('Request not found');
    if (request.status !== 'PENDING') throw new ConflictException('Request already processed');

    const updated = await this.trainerRequestRepository.updateStatus(requestId, status);
    if (status === 'APPROVED') {
      await this.userRepository.update(request.userId, { role: 'TRAINER' });
    }
    return updated;
  }
}
