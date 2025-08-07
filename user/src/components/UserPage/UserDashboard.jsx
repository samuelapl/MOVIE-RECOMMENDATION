import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieBanner from "./MovieBanner";
import SearchBar from "./SearchBar";
import MovieCard from "./MovieCard";
import GenreFilter from "./GenreFilter";
import { FaFilm, FaSpinner } from "react-icons/fa";

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
    "Action", "Comedy", "Drama", "Science Fiction", "Horror",
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

  const getPageTitle = () => {
    if (selectedGenre) return `${selectedGenre} Movies`;
    if (activeTab === 'favorites') return 'Your Favorite Movies';
    if (activeTab === 'trending') return 'Trending Movies';
    if (activeTab === 'new') return 'New Releases';
    return 'Discover Movies';
  };

  const getPageSubtitle = () => {
    if (selectedGenre) return `Explore the best ${selectedGenre.toLowerCase()} movies`;
    if (activeTab === 'favorites') return 'Your personal collection of favorite films';
    return 'Find your next favorite film from our curated collection';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, purple 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, pink 0%, transparent 50%)`,
        }} />
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-16 pt-4">
        {/* Hero Banner */}
        {featuredMovies.length > 0 && (
          <section className="mb-12">
            <MovieBanner movies={featuredMovies} />
          </section>
        )}

        {/* Page Header */}
        <section className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              {getPageTitle()}
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {getPageSubtitle()}
            </p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center max-w-4xl mx-auto">
            <div className="flex-1 w-full max-w-2xl">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>
            <GenreFilter 
              genres={genres} 
              selectedGenre={selectedGenre} 
              setSelectedGenre={setSelectedGenre} 
            />
          </div>
        </section>

        {/* Content Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
              <FaSpinner className="absolute inset-0 m-auto text-purple-500 text-2xl animate-pulse" />
            </div>
            <p className="mt-6 text-slate-400 text-lg">Loading amazing movies...</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <div className="mb-8">
              <FaFilm className="text-6xl text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4 text-slate-300">No movies found</h3>
              <p className="text-slate-400 max-w-md mx-auto text-lg">
                {searchQuery 
                  ? `No results found for "${searchQuery}". Try a different search term.`
                  : 'Try adjusting your filters to discover more movies.'}
              </p>
            </div>
            {(searchQuery || selectedGenre) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedGenre(null);
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {filteredMovies.length} {filteredMovies.length === 1 ? 'Movie' : 'Movies'} Found
                </h2>
                <p className="text-slate-400 mt-1">
                  {searchQuery && `Results for "${searchQuery}"`}
                  {searchQuery && selectedGenre && ` in ${selectedGenre}`}
                  {!searchQuery && selectedGenre && `${selectedGenre} movies`}
                </p>
              </div>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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
