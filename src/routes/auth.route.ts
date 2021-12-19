import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller';
import { signUpValidation, loginValidation } from '../validations/auth.validation';

const router = Router();

router.route('/signup').post(signUpValidation, signup);
router.route('/login').post(loginValidation, login);

export { router as authRoutes };
