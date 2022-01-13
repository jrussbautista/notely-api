import { Router } from 'express';
import {
  getNotes,
  addNote,
  getNote,
  deleteNote,
  updateNote,
  getTrashNotes,
  restoreNote,
} from '../controllers/note.controller';
import { checkAuth } from '../middleware/auth';
import { notesValidation } from '../validations/notes.validation';

const router = Router();

router.use(checkAuth);

router.route('/').get(getNotes).post(notesValidation, addNote);
router.route('/trash').get(getTrashNotes);
router.route('/:id').get(getNote).delete(deleteNote).put(notesValidation, updateNote);
router.route('/:id/restore').post(restoreNote);

export { router as notesRoutes };
