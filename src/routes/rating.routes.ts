import { Router } from 'express';
import { getCourseRatings, createRating, updateRating, deleteRating } from '../controllers/rating.controller';
import { authenticate } from '../middlewares/auth.middlewares';

const router = Router();

router.get('/courses/:courseId/ratings', getCourseRatings);
router.post('/courses/:courseId/rating', authenticate, createRating);
router.patch('/ratings/:id', authenticate, updateRating);
router.delete('/ratings/:id', authenticate, deleteRating);

export default router;
