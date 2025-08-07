import React, { useState, useEffect } from 'react';
import { FaFilm, FaUserCircle } from 'react-icons/fa';
import { FiLogIn, FiMenu, FiX } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext.jsx';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-8 h-8 md:w-10 md:h-10  bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300">
              <FaFilm className="text-white text-xl" />
            </div>
            <div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Roha Picks
              </span>
              <p className="text-xs text-slate-400 -mt-1">Movie Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/user-page">
                  <button className="flex items-center px-4 py-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/50 transition-all duration-300">
                    <FaUserCircle className="mr-2" />
                    Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                >
                  <FiLogIn />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="flex items-center px-4 py-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/50 transition-all duration-300">
                    <FiLogIn className="mr-2" />
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 hover:scale-105">
                    <FaUserCircle />
                    <span>Sign Up</span>
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-slate-800/50 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-2xl">
            <div className="px-4 py-6 space-y-4">
              {user ? (
                <>
                  <Link to="/user-page" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full flex items-center px-4 py-3 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/50 transition-all">
                      <FaUserCircle className="mr-3" />
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium flex items-center justify-center space-x-2"
                  >
                    <FiLogIn />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full flex items-center px-4 py-3 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800/50 transition-all">
                      <FiLogIn className="mr-3" />
                      Login
                    </button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium flex items-center justify-center space-x-2">
                      <FaUserCircle />
                      <span>Sign Up</span>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
