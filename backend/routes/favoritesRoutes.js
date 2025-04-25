// routes/favoritesRoutes.js
import express from 'express';
import { protect } from '../middlewares/auth.js';
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites
} from '../controllers/favoritesController.js';

const router = express.Router();

router.route('/').get(protect, getFavorites);
router.route('/:movieId').post(protect,addToFavorites);
router.route('/:movieId')
  .delete(protect, removeFromFavorites);

export default router;