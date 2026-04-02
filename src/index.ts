import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import categoryRoutes from './routes/category.routes';
import courseRoutes from './routes/course.routes';
import sectionRoutes from './routes/section.routes';
import lessonRoutes from './routes/lesson.routes';
import enrollmentRoutes from './routes/enrollment.routes';
import ratingRoutes from './routes/rating.routes';
import wishlistRoutes from './routes/wishlist.routes';
import trainerRequestRoutes from './routes/trainerRequest.routes';
import discussionRoutes from './routes/discussion.routes';
import orderRoutes from './routes/order.routes';
import lessonCompletionRoutes from './routes/lessonCompletion.routes';
import trainerRoutes from './routes/trainer.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api', sectionRoutes);          // /api/courses/:courseId/sections & /api/sections/:id
app.use('/api', lessonRoutes);           // /api/sections/:sectionId/lessons & /api/lessons/:id
app.use('/api', enrollmentRoutes);       // /api/my-courses & /api/courses/:courseId/enroll
app.use('/api', ratingRoutes);           // /api/courses/:courseId/rating(s) & /api/ratings/:id
app.use('/api/wishlist', wishlistRoutes);
app.use('/api', trainerRequestRoutes);   // /api/trainer/request & /api/admin/trainer/:id/verify
app.use('/api', discussionRoutes);       // /api/lessons/:lessonId/discussions & /api/discussions/:id/replies
app.use('/api/orders', orderRoutes);
app.use('/api', lessonCompletionRoutes); // /api/lessons/:lessonId/complete & /api/analytics/learning
app.use('/api/trainer', trainerRoutes);  // /api/trainer/dashboard & /api/trainer/sales

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
