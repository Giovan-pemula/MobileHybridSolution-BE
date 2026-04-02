import { Router } from 'express';
import { submitTrainerRequest, getTrainerRequests, verifyTrainer } from '../controllers/trainerRequest.controller';
import { authenticate } from '../middlewares/auth.middlewares';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.post('/trainer/request', authenticate, submitTrainerRequest);
router.get('/admin/trainer-requests', authenticate, authorize('ADMIN'), getTrainerRequests);
router.patch('/admin/trainer/:id/verify', authenticate, authorize('ADMIN'), verifyTrainer);

export default router;
