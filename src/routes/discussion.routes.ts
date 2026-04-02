import { Router } from 'express';
import { getDiscussions, createDiscussion, createReply } from '../controllers/discussion.controller';
import { authenticate } from '../middlewares/auth.middlewares';

const router = Router();

router.get('/lessons/:lessonId/discussions', getDiscussions);
router.post('/lessons/:lessonId/discussions', authenticate, createDiscussion);
router.post('/discussions/:id/replies', authenticate, createReply);

export default router;
