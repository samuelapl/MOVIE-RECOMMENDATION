// ForYouPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/authContext'; // Import useAuth
import MovieCard from './MovieCard';

const REACT_APP_API_URL = import.meta.env.VITE_BASE_URI;

const ForYouPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, authLoading } = useAuth(); // Get auth state

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
      // Remove withCredentials unless you're using cookies
    });
    
    setMovies(response.data);
  } catch (err) {
    console.error('Error details:', err.response?.data || err.message);
    setError(err.response?.data?.error || err.message || 'Failed to load movies');
  } finally {
    setLoading(false);
  }
};

    // Only fetch if auth is done loading and user is authenticated
    if (!authLoading && user) {
      fetchForYouMovies();
    } else if (!authLoading && !user) {
      setError('Please login to view personalized recommendations');
      setLoading(false);
    }
  }, [user, authLoading]); // Add dependencies

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white text-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">For You</h1>
        
        {movies.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold mb-2">No movies found for your genres</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Try adding more genres in your settings or wait for new movies to be added.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ForYouPage;