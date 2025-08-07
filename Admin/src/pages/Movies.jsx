import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard"; 
import { toast } from "react-toastify"; 

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const REACT_APP_API_URL = import.meta.env.VITE_BASE_URI; 

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMovieTrailer = async (tmdbMovieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${tmdbMovieId}/videos?api_key=${TMDB_API_KEY}`
      );
      const videos = response.data.results;
      const trailer = videos.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer'
      );
      return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
    } catch (error) {
      console.error(`Error fetching trailer for movie ${tmdbMovieId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [popularRes, savedRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
          ),
          axios.get(`${REACT_APP_API_URL}/api/movies`),
        ]);

        const detailedMovies = await Promise.all(
          popularRes.data.results.map(async (movie) => {
            try {
              const detailRes = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}`
              );
              // Corrected: Use 'trailerUrl' variable name consistently
              const trailerUrl = await fetchMovieTrailer(movie.id); 
              return { 
                ...detailRes.data, 
                trailer_url: trailerUrl,
                // Ensure genres are correctly formatted for display if needed
                genres: detailRes.data.genres || [],
                
              };
            } catch (err) {
              console.error(
                `Failed to fetch details for movie ${movie.id}:`,
                err
              );
              // Fallback with default values for missing data
              return { 
                ...movie, 
                trailer_url: null,
                genres: [],
                runtime: null,
                original_language: null
              }; 
            }
          })
        );

        setMovies(detailedMovies);
        setSavedMovies(savedRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        toast.error("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]); 

  const handleAddMovie = async (movie) => {
    try {
      await axios.post(`${REACT_APP_API_URL}/api/movies`, movie);
      setSavedMovies((prev) => [...prev, movie]);
      toast.success(`${movie.title} added successfully!`);
    } catch (err) {
      console.error("Error adding movie:", err);
      toast.error("Failed to add movie");
    }
  };

  const handleDeleteMovie = async (movieId) => {
    try {
      await axios.delete(`${REACT_APP_API_URL}/api/movies/${movieId}`);
      setSavedMovies((prev) => prev.filter((m) => m.id !== movieId));
      toast.success("Movie removed successfully!");
    } catch (err) {
      console.error("Error deleting movie:", err); 
      toast.error("Failed to remove movie");
    }
  };

  const isMovieSaved = (movieId) => {
    return savedMovies.some((m) => m.id === movieId);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Popular Movies</h1> {/* Added text-white */}

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
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 bg-blue-600 text-white rounded-md">
              {page}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
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
