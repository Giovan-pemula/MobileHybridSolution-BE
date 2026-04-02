import { Router } from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middlewares';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.get('/', authenticate, authorize('ADMIN'), getUsers);
router.get('/:id', authenticate, getUser);
router.patch('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, authorize('ADMIN'), deleteUser);

export default router;
