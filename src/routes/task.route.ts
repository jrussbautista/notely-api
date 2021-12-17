import { Router } from 'express';
import { getTasks, addTask } from '../controllers/task.controller';

const router = Router();

router.route('/').get(getTasks).post(addTask);

export { router as taskRoutes };
