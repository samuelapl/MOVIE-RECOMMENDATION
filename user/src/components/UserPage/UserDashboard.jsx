// UserDashboard.js
import React, { useState, useEffect } from 'react';
import MovieBanner from './MovieBanner';
import axios from "axios"
import Sidebar from './Sidebar';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';

const UserDashboard = () => {
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/movies');
        setMovies(response.data);
        setFeaturedMovies(response.data.slice(0, 5)); // First 5 movies for banner
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on search and genre selection
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    movie.overview.toLowerCase().includes(searchQuery.toLowerCase());

                         const matchesGenre = !selectedGenre || movie.genres.some(g => g.name === selectedGenre);

    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'favorites' && movie.isFavorite) ||
                      (activeTab === 'trending' && movie.isTrending) ||
                      (activeTab === 'new' && movie.isNewRelease);
    
    return matchesSearch && matchesGenre && matchesTab;
  });

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Message */}
          <div className="mb-6">
            <p className="text-gray-400">Discover your next favorite movie</p>
          </div>

          {/* Search Bar */}
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Movie Banner */}
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
    </div>
  );
};

export default UserDashboard;