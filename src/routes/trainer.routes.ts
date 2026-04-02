import { Router } from 'express';
import { getTrainerDashboard, getTrainerSales } from '../controllers/trainer.controller';
import { authenticate } from '../middlewares/auth.middlewares';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.get('/dashboard', authenticate, authorize('TRAINER', 'ADMIN'), getTrainerDashboard);
router.get('/sales', authenticate, authorize('TRAINER', 'ADMIN'), getTrainerSales);

export default router;
