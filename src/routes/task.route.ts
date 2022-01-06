import { Router } from 'express';
import { getTasks, addTask, getTask, deleteTask } from '../controllers/task.controller';
import { checkAuth } from '../middleware/auth';

const router = Router();

router.use(checkAuth);

router.route('/').get(getTasks).post(addTask);
router.route('/:id').get(getTask).delete(deleteTask);

export { router as taskRoutes };
