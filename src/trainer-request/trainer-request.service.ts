import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { TrainerRequestRepository } from './trainer-request.repository';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class TrainerRequestService {
  constructor(
    private readonly trainerRequestRepository: TrainerRequestRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async submitRequest(userId: number, data: { cvUrl: string; bio: string; experience: string }) {
    const existing = await this.trainerRequestRepository.findByUserId(userId);
    if (existing) throw new ConflictException('You already have a pending request');
    return this.trainerRequestRepository.create({ userId, ...data });
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
