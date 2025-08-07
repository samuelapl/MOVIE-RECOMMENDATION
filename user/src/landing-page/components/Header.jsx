import React from 'react';
import { FaFilm, FaUserCircle } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext.jsx';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <FaFilm className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Bruh Picks
              </span>
            </Link>
          </div>

          {/* Right side - Auth Buttons (always visible) */}
          <div className="flex items-center space-x-2">
            {user ? (
              <>
                <Link to="/user-page">
                  <button className="hidden sm:flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                    <FaUserCircle className="mr-1" />
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-200"
                >
                  <FiLogIn className="mr-1" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                    <FiLogIn className="mr-1" />
                    <span className="hidden sm:inline">Login</span>
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-200">
                    <FaUserCircle className="mr-1" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;