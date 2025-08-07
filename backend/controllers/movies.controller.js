import Movie from '../models/Movie.model.js';
import User from '../models/User.js';

// Add or update movie
export const addMovie = async (req, res) => {
  try {
    const movieData = req.body;
    const movie = await Movie.findOneAndUpdate(
      { id: movieData.id },
      movieData,
      { upsert: true, new: true }
    );
    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete movie
export const deleteMovie = async (req, res) => {
  try {
    await Movie.findOneAndDelete({ id: req.params.id });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get specific movie by TMDB ID
export const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({ id: req.params.id });
    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getForYouMovies = async (req, res) => {
  try {
    const userId = req.user.id; // Assumes user ID is available from a middleware
    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const user = await User.findById(userId);
    if (!user || user.favoriteGenres.length === 0) {
      return res.status(404).json({ error: 'User not found or no favorite genres selected' });
    }

    const favoriteGenres = user.favoriteGenres;
    
    // Find movies where at least one genre matches a user's favorite genre
    const movies = await Movie.find({
      'genres.name': { $in: favoriteGenres }
    });

    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};