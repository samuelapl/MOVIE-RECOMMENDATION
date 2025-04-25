import express from 'express';
import {
  register,
  login,
  getMe,
  verifyToken

} from '../controllers/authController.js';
import { protect,verifyTokenMiddleWare } from '../middlewares/auth.js';


const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/me', protect, getMe);

// Add this new route
router.get('/verify', verifyTokenMiddleWare, verifyToken);

export default router;
