import express from 'express';
import {
  addMovie,
  deleteMovie,
  getMovies,
  getMovie,
  getForYouMovies
} from '../controllers/movies.controller.js';

import { authMiddleware } from '../middlewares/auth.js';
const router = express.Router();


router.get('/for-you', authMiddleware,getForYouMovies);

// Admin-only routes
router.post('/',  addMovie);
router.delete('/:id', deleteMovie);

// Public routes
router.get('/', getMovies);
router.get('/:id', getMovie);

export default router;