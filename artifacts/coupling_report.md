# Coupling Metrics Analysis (ISO/IEC 25010 - Maintainability)

Coupling analysis evaluates the degree of interdependence between modules in the codebase:
- **Afferent Coupling ($C_a$)**: Incoming dependencies. Number of other modules depending on this module.
- **Efferent Coupling ($C_e$)**: Outgoing dependencies. Number of modules this module depends on.
- **Instability ($I = \frac{C_e}{C_a + C_e}$)**: Range [0 (completely stable) to 1 (completely unstable)].

| Module Path | Afferent Coupling ($C_a$) | Efferent Coupling ($C_e$) | Instability ($I$) | Category |
| :--- | :---: | :---: | :---: | :--- |
| `app.module.ts` | 1 | 18 | 0.95 | Unstable (Flexible) |
| `auth/auth.controller.ts` | 1 | 6 | 0.86 | Unstable (Flexible) |
| `auth/auth.module.ts` | 1 | 4 | 0.8 | Unstable (Flexible) |
| `auth/auth.repository.ts` | 2 | 1 | 0.33 | Balanced |
| `auth/auth.service.ts` | 2 | 4 | 0.67 | Balanced |
| `auth/auth.validation.ts` | 2 | 0 | 0 | Stable |
| `auth/google.strategy.ts` | 1 | 1 | 0.5 | Balanced |
| `category/category.controller.ts` | 1 | 6 | 0.86 | Unstable (Flexible) |
| `category/category.module.ts` | 1 | 3 | 0.75 | Unstable (Flexible) |
| `category/category.repository.ts` | 2 | 1 | 0.33 | Balanced |
| `category/category.service.ts` | 2 | 1 | 0.33 | Balanced |
| `category/category.validation.ts` | 1 | 0 | 0 | Stable |
| `common/decorators/current-user.decorator.ts` | 14 | 0 | 0 | Stable |
| `common/decorators/roles.decorator.ts` | 9 | 0 | 0 | Stable |
| `common/filters/http-exception.filter.ts` | 1 | 0 | 0 | Stable |
| `common/guards/jwt-auth.guard.ts` | 15 | 1 | 0.06 | Stable |
| `common/guards/jwt-refresh.guard.ts` | 1 | 1 | 0.5 | Balanced |
| `common/guards/roles.guard.ts` | 8 | 1 | 0.11 | Stable |
| `common/interceptors/response.interceptor.ts` | 1 | 0 | 0 | Stable |
| `common/multer/multer.config.ts` | 3 | 0 | 0 | Stable |
| `common/pipes/zod-validation.pipe.ts` | 10 | 0 | 0 | Stable |
| `common/prisma/prisma.module.ts` | 2 | 1 | 0.33 | Balanced |
| `common/prisma/prisma.service.ts` | 20 | 0 | 0 | Stable |
| `common/storage/r2.module.ts` | 1 | 1 | 0.5 | Balanced |
| `common/storage/r2.service.ts` | 4 | 0 | 0 | Stable |
| `config/database.ts` | 0 | 0 | 0 | Stable |
| `config/env.ts` | 5 | 0 | 0 | Stable |
| `config/midtrans.ts` | 1 | 1 | 0.5 | Balanced |
| `course/course.controller.ts` | 1 | 8 | 0.89 | Unstable (Flexible) |
| `course/course.module.ts` | 3 | 4 | 0.57 | Balanced |
| `course/course.repository.ts` | 4 | 1 | 0.2 | Stable |
| `course/course.service.ts` | 2 | 4 | 0.67 | Balanced |
| `course/course.validation.ts` | 1 | 0 | 0 | Stable |
| `discussion/discussion.controller.ts` | 1 | 5 | 0.83 | Unstable (Flexible) |
| `discussion/discussion.module.ts` | 1 | 3 | 0.75 | Unstable (Flexible) |
| `discussion/discussion.repository.ts` | 2 | 1 | 0.33 | Balanced |
| `discussion/discussion.service.ts` | 2 | 1 | 0.33 | Balanced |
| `discussion/discussion.validation.ts` | 1 | 0 | 0 | Stable |
| `enrollment/enrollment.controller.ts` | 1 | 3 | 0.75 | Unstable (Flexible) |
| `enrollment/enrollment.module.ts` | 2 | 4 | 0.67 | Balanced |
| `enrollment/enrollment.repository.ts` | 3 | 1 | 0.25 | Stable |
| `enrollment/enrollment.service.ts` | 2 | 3 | 0.6 | Balanced |
| `gamification/gamification.controller.ts` | 1 | 3 | 0.75 | Unstable (Flexible) |
| `gamification/gamification.module.ts` | 3 | 3 | 0.5 | Balanced |
| `gamification/gamification.repository.ts` | 2 | 1 | 0.33 | Balanced |
| `gamification/gamification.service.ts` | 4 | 1 | 0.2 | Stable |
| `health.controller.ts` | 1 | 0 | 0 | Stable |
| `lesson-completion/lesson-completion.controller.ts` | 1 | 3 | 0.75 | Unstable (Flexible) |
| `lesson-completion/lesson-completion.module.ts` | 1 | 4 | 0.8 | Unstable (Flexible) |
| `lesson-completion/lesson-completion.repository.ts` | 2 | 1 | 0.33 | Balanced |
| `lesson-completion/lesson-completion.service.ts` | 2 | 3 | 0.6 | Balanced |
| `lesson/lesson.controller.ts` | 1 | 7 | 0.88 | Unstable (Flexible) |
| `lesson/lesson.module.ts` | 1 | 4 | 0.8 | Unstable (Flexible) |
| `lesson/lesson.repository.ts` | 2 | 1 | 0.33 | Balanced |
| `lesson/lesson.service.ts` | 2 | 2 | 0.5 | Balanced |
| `lesson/lesson.validation.ts` | 1 | 0 | 0 | Stable |
| `main.ts` | 0 | 3 | 1 | Unstable (Flexible) |
| `order/order.controller.ts` | 1 | 7 | 0.88 | Unstable (Flexible) |
| `order/order.module.ts` | 1 | 5 | 0.83 | Unstable (Flexible) |
| `order/order.repository.ts` | 2 | 1 | 0.33 | Balanced |
| `order/order.service.ts` | 2 | 6 | 0.75 | Unstable (Flexible) |
| `order/order.validation.ts` | 1 | 0 | 0 | Stable |
| `rating/rating.controller.ts` | 1 | 5 | 0.83 | Unstable (Flexible) |
| `rating/rating.module.ts` | 1 | 3 | 0.75 | Unstable (Flexible) |
| `rating/rating.repository.ts` | 2 | 1 | 0.33 | Balanced |
| `rating/rating.service.ts` | 2 | 1 | 0.33 | Balanced |
| `rating/rating.validation.ts` | 1 | 0 | 0 | Stable |
| `section/section.controller.ts` | 1 | 7 | 0.88 | Unstable (Flexible) |
| `section/section.module.ts` | 2 | 4 | 0.67 | Balanced |
| `section/section.repository.ts` | 3 | 1 | 0.25 | Stable |
| `section/section.service.ts` | 2 | 2 | 0.5 | Balanced |
| `section/section.validation.ts` | 1 | 0 | 0 | Stable |
| `seeders/admin.seeder.ts` | 0 | 0 | 0 | Stable |
| `seeders/categories.seeder.ts` | 0 | 0 | 0 | Stable |
| `seeders/coupons.seeder.ts` | 0 | 0 | 0 | Stable |
| `seeders/courses.seeder.ts` | 0 | 0 | 0 | Stable |
| `seeders/gamification.seeder.ts` | 0 | 0 | 0 | Stable |
| `seeders/interactions.seeder.ts` | 0 | 0 | 0 | Stable |
| `seeders/trainers.seeder.ts` | 0 | 0 | 0 | Stable |
| `seeders/users.seeder.ts` | 0 | 0 | 0 | Stable |
| `trainer-request/trainer-request.controller.ts` | 1 | 8 | 0.89 | Unstable (Flexible) |
| `trainer-request/trainer-request.module.ts` | 1 | 4 | 0.8 | Unstable (Flexible) |
| `trainer-request/trainer-request.repository.ts` | 2 | 1 | 0.33 | Balanced |
| `trainer-request/trainer-request.service.ts` | 2 | 3 | 0.6 | Balanced |
| `trainer-request/trainerRequest.validation.ts` | 1 | 0 | 0 | Stable |
| `trainer/trainer.controller.ts` | 1 | 5 | 0.83 | Unstable (Flexible) |
| `trainer/trainer.module.ts` | 1 | 3 | 0.75 | Unstable (Flexible) |
| `trainer/trainer.repository.ts` | 2 | 1 | 0.33 | Balanced |
| `trainer/trainer.service.ts` | 2 | 1 | 0.33 | Balanced |
| `user/user.controller.ts` | 1 | 8 | 0.89 | Unstable (Flexible) |
| `user/user.module.ts` | 2 | 3 | 0.6 | Balanced |
| `user/user.repository.ts` | 3 | 1 | 0.25 | Stable |
| `user/user.service.ts` | 2 | 3 | 0.6 | Balanced |
| `user/user.validation.ts` | 1 | 0 | 0 | Stable |
| `utils/jwt.ts` | 3 | 1 | 0.25 | Stable |
| `utils/pagination.ts` | 2 | 0 | 0 | Stable |
| `wishlist/wishlist.controller.ts` | 1 | 3 | 0.75 | Unstable (Flexible) |
| `wishlist/wishlist.module.ts` | 1 | 3 | 0.75 | Unstable (Flexible) |
| `wishlist/wishlist.repository.ts` | 2 | 1 | 0.33 | Balanced |
| `wishlist/wishlist.service.ts` | 2 | 1 | 0.33 | Balanced |
