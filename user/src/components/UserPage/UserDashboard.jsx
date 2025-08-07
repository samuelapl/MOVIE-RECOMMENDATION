import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieBanner from "./MovieBanner";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import GenreFilter from "./GenreFilter";
const REACT_APP_API_URL = import.meta.env.VITE_BASE_URI;
const UserDashboard = ({
  selectedGenre,
  activeTab,
  setSelectedGenre,
}) => {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
 
  const genres = [
    "Action", "Comedy", "Drama", "Sci-Fi", "Horror",
    "Romance", "Thriller", "Documentary", "Animation",
    "Fantasy", "Mystery", "Crime", "Adventure"
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${REACT_APP_API_URL}/api/movies`);
        setMovies(response.data);
        setFeaturedMovies(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         movie.overview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !selectedGenre || 
                        (movie.genres && movie.genres.some((g) => g.name === selectedGenre));
    const matchesTab = activeTab === "all" ||
                      (activeTab === "favorites" && movie.isFavorite) ||
                      (activeTab === "trending" && movie.isTrending) ||
                      (activeTab === "new" && movie.isNewRelease);
    return matchesSearch && matchesGenre && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-4">
        {/* Hero Banner */}
        <section className="mb-8 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
          <MovieBanner movies={featuredMovies} />
        </section>

        {/* Search and Filter Section */}
        <section className="mb-8">
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {selectedGenre 
                ? `${selectedGenre} Movies` 
                : activeTab === 'favorites' 
                  ? 'Your Favorite Movies'
                  : 'Browse Movies'}
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">
              {selectedGenre 
                ? `Top ${selectedGenre} movies to watch` 
                : 'Discover your next favorite film'}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <GenreFilter 
              genres={genres} 
              selectedGenre={selectedGenre} 
              setSelectedGenre={setSelectedGenre} 
            />
          </div>
        </section>

        {/* Movie Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl font-bold mb-2">No movies found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {searchQuery 
                ? `No results for "${searchQuery}"`
                : 'Try adjusting your filters to find more movies'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {filteredMovies.length} {filteredMovies.length === 1 ? 'Movie' : 'Movies'} Found
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;