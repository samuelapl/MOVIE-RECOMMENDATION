// controllers/favoritesController.js
import User from '../models/User.js';
import Movie from '../models/Movie.model.js';

// Add movie to favorites
// Add movie to favorites
export const addToFavorites = async (req, res) => {
  try {
    const movieId = parseInt(req.params.movieId); // TMDB movie ID as param

    // Find the movie by TMDB ID
    const movie = await Movie.findOne({ id: movieId });
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Avoid duplicate favorites
    if (user.favorites.includes(movie._id)) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }

    user.favorites.push(movie._id);
    await user.save();

    res.status(200).json({
      success: true,
      favorites: await Movie.find({ _id: { $in: user.favorites } }),
    });
  } catch (error) {
    console.error('Add to favorites error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Remove movie from favorites
// Remove movie from favorites
export const removeFromFavorites = async (req, res) => {
  try {
    const { movieId } = req.params; // movieId = TMDB id
    const userId = req.user.id;

    // Find the movie by TMDB id first
    const movie = await Movie.findOne({ id: movieId });
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found in database'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { favorites: movie._id } },
      { new: true }
    ).populate('favorites');

    res.status(200).json({
      success: true,
      message: 'Movie removed from favorites',
      favorites: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from favorites',
      error: error.message
    });
  }
};

// Get user's favorites
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate('favorites');
    
    res.status(200).json({
      success: true,
      favorites: user.favorites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching favorites',
      error: error.message
    });
  }
};