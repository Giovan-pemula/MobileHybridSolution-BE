import { Router } from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlist.controller';
import { authenticate } from '../middlewares/auth.middlewares';

const router = Router();

router.get('/', authenticate, getWishlist);
router.post('/', authenticate, addToWishlist);
router.delete('/:courseId', authenticate, removeFromWishlist);

export default router;
