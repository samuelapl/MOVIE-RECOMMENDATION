import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext';
import MovieCard from '../../components/UserPage/MovieCard';
import { FaStar, FaSpinner, FaHeart, FaFilm } from 'react-icons/fa';
import { motion } from 'framer-motion';

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URI;

const ForYouPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, authLoading } = useAuth();

  useEffect(() => {
    const fetchForYouMovies = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get(`${REACT_APP_API_URL}/api/movies/for-you`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setMovies(response.data);
      } catch (err) {
        console.error('Error details:', err.response?.data || err.message);
        setError(err.response?.data?.error || err.message || 'Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      fetchForYouMovies();
    } else if (!authLoading && !user) {
      setError('Please login to view personalized recommendations');
      setLoading(false);
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
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
             Your Perfect Movies
            </h2>
            <p className="text-slate-400 text-lg max-w-md mx-auto">
             Analyzing your preferences to find the perfect films just for you...
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
              Oops! Something went wrong
            </h2>
            <p className="text-slate-300 mb-6">
              {error}
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
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
              <FaStar className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                For You
              </h1>
              <p className="text-slate-400 mt-1">
                Personalized recommendations based on your preferences
              </p>
            </div>
          </div>
        </motion.div>
        
        {movies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-20"
          >
            <div className="mb-8">
              <FaHeart className="text-6xl text-slate-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-slate-300">No personalized movies yet</h3>
              <p className="text-slate-400 max-w-md mx-auto text-lg leading-relaxed">
                We're still learning your preferences. Add more movies to your favorites 
                or update your genre preferences to get better recommendations.
              </p>
            </div>
            <div className="space-y-4">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105 mr-4">
                Browse All Movies
              </button>
              <button className="px-6 py-3 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 text-white rounded-xl font-medium hover:bg-slate-600/50 transition-all duration-300">
                Update Preferences
              </button>
            </div>
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
                  {movies.length} {movies.length === 1 ? 'Movie' : 'Movies'} Curated For You
                </h2>
                <p className="text-slate-400 mt-1">
                  Based on your favorite genres and viewing history
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
              {movies.map((movie, index) => (
                <motion.div
                  key={movie._id}
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

export default ForYouPage;
