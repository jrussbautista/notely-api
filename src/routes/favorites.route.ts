import { Router } from 'express';
import { checkAuth } from '../middleware/auth';
import { getFavoriteNotes, toggleFavoriteNote } from '../controllers/favorite.controller';

const router = Router();

router.use(checkAuth);

router.route('/').get(getFavoriteNotes);
router.route('/:id').post(toggleFavoriteNote);

export { router as favoritesRoutes };
