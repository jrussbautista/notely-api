import { Router } from 'express';
import { signup, login, getMe } from '../controllers/auth.controller';
import { signUpValidation, loginValidation } from '../validations/auth.validation';
import { checkAuth } from '../middleware/auth';

const router = Router();

router.route('/signup').post(signUpValidation, signup);
router.route('/login').post(loginValidation, login);

router.use(checkAuth);

router.route('/me').get(getMe);

export { router as authRoutes };
