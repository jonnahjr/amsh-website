import { Router } from 'express';
import { PostsController } from './posts.controller';
import { authGuard, requireEditorBody } from '../../core/middlewares/auth.middleware';
import { validate } from '../../core/middlewares/validation.middleware';
import { postSchema } from '../../core/validation/schemas';

const router = Router();
const controller = new PostsController();

// --- PUBLIC ROUTES (Institutional Content) ---
router.get('/', controller.getAll);
router.get('/:slug', controller.getBySlug);
// Compatibility for getById
router.get('/id/:id', controller.getById);

// --- ADMIN ROUTES (Content Governance) ---
router.post(
  '/', 
  authGuard, 
  requireEditorBody, 
  validate(postSchema), 
  controller.create
);

router.delete(
  '/:id', 
  authGuard, 
  requireEditorBody, 
  controller.delete
);

export default router;
