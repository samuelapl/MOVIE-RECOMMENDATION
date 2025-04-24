import express from 'express';
import router from express.Router();
import {
  register,
  login,
  getMe,
} from '../controllers/authController';
import { protect } from '../middlewares/auth';

router.post('/signup', register);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;