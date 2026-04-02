import { Router } from 'express';
import { toggleLessonCompletion, getLearningAnalytics } from '../controllers/lessonCompletion.controller';
import { authenticate } from '../middlewares/auth.middlewares';

const router = Router();

router.post('/lessons/:lessonId/complete', authenticate, toggleLessonCompletion);
router.get('/analytics/learning', authenticate, getLearningAnalytics);

export default router;
