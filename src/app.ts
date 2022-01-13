import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

import { authRoutes } from './routes/auth.route';
import { notesRoutes } from './routes/notes.route';
import { favoritesRoutes } from './routes/favorites.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/notes', notesRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/auth', authRoutes);

export default app;
