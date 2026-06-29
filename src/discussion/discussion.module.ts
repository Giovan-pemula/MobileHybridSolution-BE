import { Module } from '@nestjs/common';
import { DiscussionController } from './discussion.controller';
import { DiscussionService } from './discussion.service';
import { DiscussionRepository } from './discussion.repository';

@Module({
  controllers: [DiscussionController],
  providers: [DiscussionService, DiscussionRepository],
})
export class DiscussionModule {}
