import React from 'react';
import { FaFilm, FaSearch, FaUserCircle } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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

          {/* Middle - Navigation Links (Desktop) */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a href="#" className="text-yellow-400 hover:text-yellow-300 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Movies
              </a>
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Genres
              </a>
              <a href="#" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Trending
              </a>
              <div className="relative ml-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150"
                  placeholder="Search movies..."
                />
              </div>
            </div>
          </div>

          {/* Right side - Auth Buttons */}
          <div className="hidden md:block">
  <div className="ml-4 flex items-center md:ml-6 space-x-2">
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
          <a href="#" className="block text-yellow-400 hover:text-yellow-300 px-3 py-2 rounded-md text-base font-medium">
            Home
          </a>
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            Movies
          </a>
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            Genres
          </a>
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
            Trending
          </a>
          <div className="relative mt-2 mb-2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:text-gray-900 sm:text-sm transition duration-150"
              placeholder="Search movies..."
            />
          </div>
          <div className="pt-2 pb-3 border-t border-gray-700">
            <button className="w-full flex items-center justify-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              <FiLogIn className="mr-2" />
              Login
            </button>
            <button className="w-full mt-2 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-3 py-2 rounded-md text-base font-medium transition duration-150">
              <FaUserCircle className="mr-2" />
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;