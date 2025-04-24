import React from 'react';
import { 
  FaHome, 
  FaHeart, 
  FaFire, 
  FaCalendarAlt, 
  FaFilter, 
  FaChevronDown, 
  FaChevronUp,
  FaUserCog,
  FaHistory,
  FaBookmark,
  FaCog,
  FaList
} from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { useState } from 'react';

const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  selectedGenre, 
  setSelectedGenre,
  user // Assume we're passing user data as prop
}) => {
  const [genresExpanded, setGenresExpanded] = useState(false);
  
  const genres = [
    'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror',
    'Romance', 'Thriller', 'Documentary', 'Animation',
    'Fantasy', 'Mystery', 'Crime', 'Adventure'
  ];

  // Default user if none provided
  const currentUser = user || {
    name: 'Guest User',
    email: 'guest@example.com',
    avatar: 'https://via.placeholder.com/150?text=GU'
  };

  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col">
      <div className="flex items-center mb-8">
        <FaHome className="text-yellow-400 text-xl mr-2" />
        <h2 className="text-xl font-bold">Bruh Picks</h2>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'all' ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-700'}`}
            >
              <FaHome className="mr-3" />
              All Movies
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'favorites' ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-700'}`}
            >
              <FaHeart className="mr-3" />
              Favorites
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'trending' ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-700'}`}
            >
              <FaFire className="mr-3" />
              Trending
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('new')}
              className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'new' ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-700'}`}
            >
              <FaCalendarAlt className="mr-3" />
              New Releases
            </button>
          </li>
   
    
          <li>
            <button
              onClick={() => setGenresExpanded(!genresExpanded)}
              className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700"
            >
              <div className="flex items-center">
                <FaFilter className="mr-3" />
                Genres
              </div>
              {genresExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {genresExpanded && (
              <ul className="ml-8 mt-2 space-y-1">
                {genres.map(genre => (
                  <li key={genre}>
                    <button
                      onClick={() => setSelectedGenre(genre === selectedGenre ? null : genre)}
                      className={`w-full text-left p-2 rounded ${genre === selectedGenre ? 'text-yellow-400' : 'hover:text-gray-300'}`}
                    >
                      {genre}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
       
        </ul>
      </nav>

      {/* Profile Section */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center p-3 mb-4 rounded-lg hover:bg-gray-700 cursor-pointer"
          onClick={() => setActiveTab('profile')}>
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <p className="font-medium">{currentUser.name}</p>
            <p className="text-xs text-gray-400">{currentUser.email}</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'settings' ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-700'}`}
        >
          <FaCog className="mr-3" />
          Settings
        </button>

        <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 mt-2">
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;