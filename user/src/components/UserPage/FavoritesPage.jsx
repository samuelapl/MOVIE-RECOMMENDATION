import { useEffect } from 'react';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import MovieCard from './MovieCard.jsx';

const FavoritesPage = () => {
  const { favorites, loading, fetchFavorites } = useFavorites();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-white mb-8">Your Favorite Movies</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">You haven't added any favorites yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {favorites.map(movie => (
              <MovieCard key={movie.tmdbId || movie._id} movie={movie} />
            ))}
          </div>
        )}
      </div>
  );
};

export default FavoritesPage;