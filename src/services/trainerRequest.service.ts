import { trainerRequestRepository } from '../repositories/trainerRequest.repository';
import { userRepository } from '../repositories/user.repository';

export class TrainerRequestService {
  async submitRequest(userId: number, data: { cvUrl: string; bio: string; experience: string }) {
    const existing = await trainerRequestRepository.findByUserId(userId);
    if (existing) throw new Error('REQUEST_ALREADY_EXISTS');
    return trainerRequestRepository.create({ userId, ...data });
  }

  async getAllRequests(status?: string) {
    return trainerRequestRepository.findAll(status);
  }

  async verifyTrainer(requestId: number, status: string) {
    const request = await trainerRequestRepository.findById(requestId);
    if (!request) throw new Error('REQUEST_NOT_FOUND');

    if (request.status !== 'PENDING') throw new Error('REQUEST_ALREADY_PROCESSED');

    const updated = await trainerRequestRepository.updateStatus(requestId, status);

    // If approved, update user role to TRAINER
    if (status === 'APPROVED') {
      await userRepository.update(request.userId, { role: 'TRAINER' });
    }

    return updated;
  }
}

export const trainerRequestService = new TrainerRequestService();
