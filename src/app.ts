import express from 'express';

import { taskRoutes } from './routes/task.route';

const app = express();

app.use(express.json());

app.use('/api/tasks', taskRoutes);

export default app;
