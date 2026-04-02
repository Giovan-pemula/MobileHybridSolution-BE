import { Router } from 'express';
import { getCourses, getCourse, createCourse, updateCourse, deleteCourse, getCourseStudents } from '../controllers/course.controller';
import { authenticate } from '../middlewares/auth.middlewares';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', authenticate, authorize('TRAINER', 'ADMIN'), createCourse);
router.patch('/:id', authenticate, authorize('TRAINER', 'ADMIN'), updateCourse);
router.delete('/:id', authenticate, authorize('TRAINER', 'ADMIN'), deleteCourse);
router.get('/:courseId/students', authenticate, authorize('TRAINER', 'ADMIN'), getCourseStudents);

export default router;
