import { Router } from 'express';
import { createLesson, updateLesson, deleteLesson } from '../controllers/lesson.controller';
import { authenticate } from '../middlewares/auth.middlewares';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.post('/sections/:sectionId/lessons', authenticate, authorize('TRAINER', 'ADMIN'), createLesson);
router.patch('/lessons/:id', authenticate, authorize('TRAINER', 'ADMIN'), updateLesson);
router.delete('/lessons/:id', authenticate, authorize('TRAINER', 'ADMIN'), deleteLesson);

export default router;
