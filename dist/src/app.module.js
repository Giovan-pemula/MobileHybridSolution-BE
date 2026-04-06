"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./common/prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const category_module_1 = require("./category/category.module");
const course_module_1 = require("./course/course.module");
const section_module_1 = require("./section/section.module");
const lesson_module_1 = require("./lesson/lesson.module");
const enrollment_module_1 = require("./enrollment/enrollment.module");
const rating_module_1 = require("./rating/rating.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const trainer_request_module_1 = require("./trainer-request/trainer-request.module");
const discussion_module_1 = require("./discussion/discussion.module");
const order_module_1 = require("./order/order.module");
const lesson_completion_module_1 = require("./lesson-completion/lesson-completion.module");
const trainer_module_1 = require("./trainer/trainer.module");
const health_controller_1 = require("./health.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            category_module_1.CategoryModule,
            course_module_1.CourseModule,
            section_module_1.SectionModule,
            lesson_module_1.LessonModule,
            enrollment_module_1.EnrollmentModule,
            rating_module_1.RatingModule,
            wishlist_module_1.WishlistModule,
            trainer_request_module_1.TrainerRequestModule,
            discussion_module_1.DiscussionModule,
            order_module_1.OrderModule,
            lesson_completion_module_1.LessonCompletionModule,
            trainer_module_1.TrainerModule,
        ],
        controllers: [health_controller_1.HealthController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map