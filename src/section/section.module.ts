import { Module } from '@nestjs/common';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
import { SectionRepository } from './section.repository';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [CourseModule],
  controllers: [SectionController],
  providers: [SectionService, SectionRepository],
  exports: [SectionRepository],
})
export class SectionModule {}
