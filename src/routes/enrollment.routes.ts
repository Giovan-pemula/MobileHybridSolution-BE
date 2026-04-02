import { Router } from 'express';
import { getMyCourses, enrollInCourse } from '../controllers/enrollment.controller';
import { authenticate } from '../middlewares/auth.middlewares';

const router = Router();

router.get('/my-courses', authenticate, getMyCourses);
router.post('/courses/:courseId/enroll', authenticate, enrollInCourse);

export default router;
