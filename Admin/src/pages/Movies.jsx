import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { toast } from 'react-toastify';
const REACT_APP_API_URL="https://movie-recommendation-backend-4780.onrender.com";
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Fetch popular movies from TMDB
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        // 1. Fetch both popular and saved movies in parallel
        const [popularRes, savedRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${
              import.meta.env.VITE_TMDB_API_KEY
            }&language=en-US&page=${page}`
          ),
          axios.get(`${REACT_APP_API_URL}/api/movies`)
        ]);
  
        // 2. Fetch detailed info for each popular movie
        const detailedMovies = await Promise.all(
          popularRes.data.results.map(async (movie) => {
            try {
              const detailRes = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${
                  import.meta.env.VITE_TMDB_API_KEY
                }`
              );
              return detailRes.data; // Returns movie with runtime, genres, etc.
            } catch (err) {
              console.error(`Failed to fetch details for movie ${movie.id}:`, err);
              return movie; // Fallback to basic data if details fail
            }
          })
        );
  
        setMovies(detailedMovies);
        setSavedMovies(savedRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        toast.error('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [page]);
  // Add movie to database
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

  // Delete movie from database
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

  // Check if movie is already saved
  const isMovieSaved = (movieId) => {
    return savedMovies.some(m => m.id === movieId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Popular Movies</h1>
      
      {loading ? (
        <div className="grid place-items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
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

export default Movies;