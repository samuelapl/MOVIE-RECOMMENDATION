import { gql, useQuery } from '@apollo/client';
import MovieCard from '../../components/UserPage/MovieCard';
import { FaHeart, FaSpinner, FaFilm } from 'react-icons/fa';
import { motion } from 'framer-motion';

const GET_FAVORITES_QUERY = gql`
  query GetUserFavorites {
    getFavorites {
      favorites {
        id
        title
        poster_path
        vote_average
        release_date
        genres {
          name
        }
      }
    }
  }
`;

const FavoritesPage = () => {
  const { data, loading, error } = useQuery(GET_FAVORITES_QUERY);
  const favorites = data?.getFavorites?.favorites || [];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, purple 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, pink 0%, transparent 50%)`,
          }} />
        </div>

        <div className="relative flex flex-col items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Loading Spinner */}
            <div className="relative mb-8">
              <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
              <FaSpinner className="absolute inset-0 m-auto text-purple-500 text-3xl animate-pulse" />
            </div>
            
            {/* Loading Text */}
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Loading Your Favorites
            </h2>
            <p className="text-slate-400 text-lg max-w-md mx-auto">
              Gathering all the movies you've loved...
            </p>
            
            {/* Loading Animation */}
            <div className="flex justify-center space-x-2 mt-8">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        {/* Background Pattern */}
        <div className="fixed inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, purple 0%, transparent 50%), 
                             radial-gradient(circle at 75% 75%, pink 0%, transparent 50%)`,
          }} />
        </div>

        <div className="relative flex items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaFilm className="text-red-400 text-3xl" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-red-400">
              Error Loading Favorites
            </h2>
            <p className="text-slate-300 mb-6">
              {error.message}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, purple 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, pink 0%, transparent 50%)`,
        }} />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
              <FaHeart className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Your Favorites
              </h1>
              <p className="text-slate-400 mt-1">
                All the movies you've added to your favorites collection
              </p>
            </div>
          </div>
        </motion.div>
        
        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="mb-8">
              <FaHeart className="text-6xl text-slate-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-slate-300">No favorites yet</h3>
              <p className="text-slate-400 max-w-md mx-auto text-lg leading-relaxed">
                Start building your collection by adding movies you love to your favorites. 
                Click the heart icon on any movie to add it here.
              </p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105">
              Discover Movies
            </button>
          </motion.div>
        ) : (
          <>
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-between items-center mb-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {favorites.length} {favorites.length === 1 ? 'Movie' : 'Movies'} in Your Collection
                </h2>
                <p className="text-slate-400 mt-1">
                  Your personal collection of favorite films
                </p>
              </div>
            </motion.div>

            {/* Movies Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
            >
              {favorites.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
};

export default FavoritesPage;
