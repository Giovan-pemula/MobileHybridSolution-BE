import { Module } from '@nestjs/common';
import { LessonCompletionController } from './lesson-completion.controller';
import { LessonCompletionService } from './lesson-completion.service';
import { LessonCompletionRepository } from './lesson-completion.repository';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [GamificationModule],
  controllers: [LessonCompletionController],
  providers: [LessonCompletionService, LessonCompletionRepository],
})
export class LessonCompletionModule {}
