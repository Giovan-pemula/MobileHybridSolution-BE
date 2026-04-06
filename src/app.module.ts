import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { CourseModule } from './course/course.module';
import { SectionModule } from './section/section.module';
import { LessonModule } from './lesson/lesson.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { RatingModule } from './rating/rating.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { TrainerRequestModule } from './trainer-request/trainer-request.module';
import { DiscussionModule } from './discussion/discussion.module';
import { OrderModule } from './order/order.module';
import { LessonCompletionModule } from './lesson-completion/lesson-completion.module';
import { TrainerModule } from './trainer/trainer.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UserModule,
    CategoryModule,
    CourseModule,
    SectionModule,
    LessonModule,
    EnrollmentModule,
    RatingModule,
    WishlistModule,
    TrainerRequestModule,
    DiscussionModule,
    OrderModule,
    LessonCompletionModule,
    TrainerModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
