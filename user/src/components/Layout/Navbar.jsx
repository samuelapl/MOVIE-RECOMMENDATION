import React from 'react';
import { FaFilm, FaSearch, FaUserCircle } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext.jsx';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
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
            <FaFilm className="h-8 w-8 text-yellow-400" />
            <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Bruh Picks
            </span>
          </div>

          {/* Right side - Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-2">
              {user ? (
                <>
                  <Link to="/user-page">
                    <button className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <FaUserCircle className="mr-1" />
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-150"
                  >
                    <FiLogIn className="mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                      <FiLogIn className="mr-1" />
                      Login
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-md text-sm font-medium flex items-center transition duration-150">
                      <FaUserCircle className="mr-1" />
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-800`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {user ? (
            <>
              <Link 
                to="/user-page" 
                className="block text-yellow-400 hover:text-yellow-300 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full mt-2 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-150"
              >
                <FiLogIn className="mr-2" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiLogIn className="mr-2 inline" />
                Login
              </Link>
              <Link 
                to="/signup" 
                className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUserCircle className="mr-2 inline" />
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;