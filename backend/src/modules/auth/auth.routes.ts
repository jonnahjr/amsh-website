import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authLimiter } from '../../core/middlewares/security.middleware';
import { validate } from '../../core/middlewares/validation.middleware';
import { loginSchema } from '../../core/validation/schemas';

const router = Router();
const controller = new AuthController();

// Strict Rate-Limited Login for Institutional Admins
router.post(
  '/login', 
  authLimiter, 
  validate(loginSchema), 
  controller.login
);

export default router;
