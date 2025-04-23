import Movie from '../models/Movie.model.js';

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

// Get all saved movies
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