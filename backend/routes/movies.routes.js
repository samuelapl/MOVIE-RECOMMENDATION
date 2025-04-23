import express from 'express';
import {
  addMovie,
  deleteMovie,
  getMovies,
  getMovie
} from '../controllers/movies.controller.js';
// import { verifyAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Admin-only routes
router.post('/',  addMovie);
router.delete('/:id', deleteMovie);

// Public routes
router.get('/', getMovies);
router.get('/:id', getMovie);

export default router;