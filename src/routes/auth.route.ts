import { Router } from 'express';
import { signup } from '../controllers/auth.controller';
import { signUpValidation } from '../validations/auth.validation';

const router = Router();

router.route('/signup').post(signUpValidation, signup);

export { router as authRoutes };
