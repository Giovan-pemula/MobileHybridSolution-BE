import { trainerRepository } from '../repositories/trainer.repository';

export class TrainerService {
  async getDashboard(trainerId: number) {
    return trainerRepository.getDashboard(trainerId);
  }

  async getSales(trainerId: number) {
    return trainerRepository.getSales(trainerId);
  }
}

export const trainerService = new TrainerService();
