import { Injectable } from '@nestjs/common';
import { TrainerRepository } from './trainer.repository';

@Injectable()
export class TrainerService {
  constructor(private readonly trainerRepository: TrainerRepository) {}

  async getDashboard(trainerId: number) {
    return this.trainerRepository.getDashboard(trainerId);
  }

  async getSales(trainerId: number) {
    return this.trainerRepository.getSales(trainerId);
  }
}
