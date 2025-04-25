import React, { useState, useEffect } from 'react';
import axios from "axios";
import MovieBanner from './MovieBanner';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';

const UserDashboard = ({ 
  
  selectedGenre, 
  activeTab,
  setSelectedGenre,
  setActiveTab 
}) => {
    console.log("UserDashboard - Rendering"); // Debug log
  
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
        setFeaturedMovies(response.data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         movie.overview.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGenre = !selectedGenre || 
                        (movie.genres && movie.genres.some(g => g.name === selectedGenre));

    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'favorites' && movie.isFavorite) ||
                      (activeTab === 'trending' && movie.isTrending) ||
                      (activeTab === 'new' && movie.isNewRelease);
    
    return matchesSearch && matchesGenre && matchesTab;
  });

  return (
    
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <p className="text-gray-400">Discover your next favorite movie</p>
          </div>

          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <MovieBanner movies={featuredMovies} />

          {loading ? (
            <p className="text-gray-400">Loading movies...</p>
          ) : filteredMovies.length === 0 ? (
            <p className="text-gray-400">No movies found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default UserDashboard;