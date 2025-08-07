import express from 'express';
import {
  register,
  login,
  getMe,
  verifyToken

} from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);

// Add this new route
router.get('/verify', authMiddleware, verifyToken);

export default router;
