import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import MovieCard from "../components/MovieCard"; // Make sure to import your MovieCard component
const REACT_APP_API_URL="https://movie-recommendation-backend-4780.onrender.com";
const SavedMovies = () => {
  const [loading, setLoading] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  const [page, setPage] = useState(1); // Added missing page state

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${REACT_APP_API_URL}/api/movies`);
        setSavedMovies(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Failed to load saved movies');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData(); // Added parentheses to call the function
  }, [page]); // Requires page to be defined in component

  const handleAddMovie = async (movie) => {
    try {
      await axios.post(`${REACT_APP_API_URL}/api/movies`, movie);
      setSavedMovies(prev => [...prev, movie]);
      toast.success(`${movie.title} added successfully!`);
    } catch (err) {
      console.log(err);
      toast.error('Failed to add movie');
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`${REACT_APP_API_URL}/api/movies/${movieId}`);
      setSavedMovies(prev => prev.filter(m => m.id !== movieId));
      toast.success('Movie removed successfully!');
    } catch (err) {
      console.log(err);
      toast.error('Failed to remove movie');
    }
  };

  const isMovieSaved = (movieId) => {
    return savedMovies.some(m => m.id === movieId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Saved Movies</h1>
      
      {loading ? (
        <div className="grid place-items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAdd={handleAddMovie}
                onDelete={handleDeleteMovie}
                isAdded={isMovieSaved(movie.id)}
              />
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => setPage(prev => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-blue-500 text-white rounded-md">
              {page}
            </span>
            <button
              onClick={() => setPage(prev => prev + 1)}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SavedMovies;