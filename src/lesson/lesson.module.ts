import { Module } from '@nestjs/common';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { LessonRepository } from './lesson.repository';
import { SectionModule } from '../section/section.module';

@Module({
  imports: [SectionModule],
  controllers: [LessonController],
  providers: [LessonService, LessonRepository],
  exports: [LessonRepository],
})
export class LessonModule {}
