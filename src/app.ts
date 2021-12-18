import * as dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

import { authRoutes } from './routes/auth.route';
import { taskRoutes } from './routes/task.route';

const app = express();

app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

export default app;
