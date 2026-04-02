import { Router } from 'express';
import { getSections, createSection, updateSection, deleteSection } from '../controllers/section.controller';
import { authenticate } from '../middlewares/auth.middlewares';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.get('/courses/:courseId/sections', getSections);
router.post('/courses/:courseId/sections', authenticate, authorize('TRAINER', 'ADMIN'), createSection);
router.patch('/sections/:id', authenticate, authorize('TRAINER', 'ADMIN'), updateSection);
router.delete('/sections/:id', authenticate, authorize('TRAINER', 'ADMIN'), deleteSection);

export default router;
