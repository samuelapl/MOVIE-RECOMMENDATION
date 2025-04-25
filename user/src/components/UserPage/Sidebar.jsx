import React, { useState } from "react";
import {
  FaHome,
  FaHeart,
  FaFire,
  FaCalendarAlt,
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaUserCog,
  FaCog,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext.jsx";

const Sidebar = ({ 
  selectedGenre, 
  setSelectedGenre,
  activeTab,
  setActiveTab 
}) => {
  const { user, logout } = useAuth();
  const [genresExpanded, setGenresExpanded] = useState(false);
  const navigate = useNavigate();

  const genres = [
    "Action", "Comedy", "Drama", "Sci-Fi", "Horror",
    "Romance", "Thriller", "Documentary", "Animation",
    "Fantasy", "Mystery", "Crime", "Adventure"
  ];

  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full bg-gray-800 p-4 flex flex-col h-full">
      {/* Logo/Branding */}
      <div className="flex items-center mb-8">
        <FaHome className="text-yellow-400 text-xl mr-2" />
        <h2 className="text-xl font-bold">Bruh Picks</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/user-page"
              onClick={() => handleNavClick('all')}
              className={({ isActive }) =>
                `flex items-center w-full p-3 rounded-lg ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-700"
                }`
              }
            >
              <FaHome className="mr-3" />
              All Movies
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/favorites"
              onClick={() => handleNavClick('favorites')}
              className={({ isActive }) =>
                `flex items-center w-full p-3 rounded-lg ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-700"
                }`
              }
            >
              <FaHeart className="mr-3" />
              Favorites
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/trending"
              onClick={() => handleNavClick('trending')}
              className={({ isActive }) =>
                `flex items-center w-full p-3 rounded-lg ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-700"
                }`
              }
            >
              <FaFire className="mr-3" />
              Trending
            </NavLink>
          </li>
          
          <li>
            <NavLink
              to="/new-releases"
              onClick={() => handleNavClick('new')}
              className={({ isActive }) =>
                `flex items-center w-full p-3 rounded-lg ${
                  isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-700"
                }`
              }
            >
              <FaCalendarAlt className="mr-3" />
              New Releases
            </NavLink>
          </li>

          {/* Genres Dropdown */}
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
                {genres.map((genre) => (
                  <li key={genre}>
                    <button
                      onClick={() => setSelectedGenre(genre === selectedGenre ? null : genre)}
                      className={`w-full text-left p-2 rounded ${
                        genre === selectedGenre
                          ? "text-yellow-400"
                          : "hover:text-gray-300"
                      }`}
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
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center p-3 mb-4 rounded-lg ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            } cursor-pointer`
          }
        >
          <img
            src={user?.avatar || "https://via.placeholder.com/150?text=GU"}
            alt={user?.name || "Guest"}
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <p className="font-medium">{user?.username || "Guest User"}</p>
            <p className="text-xs text-gray-400">
              {user?.email || "guest@example.com"}
            </p>
          </div>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center w-full p-3 rounded-lg ${
              isActive ? "bg-gray-700 text-yellow-400" : "hover:bg-gray-700"
            }`
          }
        >
          <FaCog className="mr-3" />
          Settings
        </NavLink>

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 mt-2"
        >
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;