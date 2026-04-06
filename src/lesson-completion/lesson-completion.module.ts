import { Module } from '@nestjs/common';
import { LessonCompletionController } from './lesson-completion.controller';
import { LessonCompletionService } from './lesson-completion.service';
import { LessonCompletionRepository } from './lesson-completion.repository';

@Module({
  controllers: [LessonCompletionController],
  providers: [LessonCompletionService, LessonCompletionRepository],
})
export class LessonCompletionModule {}
