// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaFilm, FaUser, FaEnvelope, FaLock, FaBirthdayCake, FaVenusMars, FaChevronRight, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from '../context/authContext.jsx'; 

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    favoriteGenres: []
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenreChange = (genre) => {
    setFormData(prev => {
      const genres = prev.favoriteGenres.includes(genre)
        ? prev.favoriteGenres.filter(g => g !== genre)
        : [...prev.favoriteGenres, genre];
      return { ...prev, favoriteGenres: genres };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.log(err)
    }
  };

  const genres = [
    "Action", "Comedy", "Drama", "Sci-Fi", "Horror",
    "Romance", "Thriller", "Documentary", "Animation",
    "Fantasy", "Mystery", "Crime", "Adventure", "Musical"
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Cinematic theater seats with dramatic lighting"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-gray-900/95"></div>
      </div>

      {/* Close Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 z-20 text-gray-300 hover:text-white transition-colors"
      >
        <FaTimes className="text-2xl" />
      </button>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl z-10"
      >
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700/50">
          {/* Header with Branding */}
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 p-6 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center justify-center mb-4"
            >
              <FaFilm className="text-3xl text-white mr-3" />
              <h1 className="text-2xl font-bold text-white">Bruh Picks</h1>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl font-semibold text-white"
            >
              Start Your Movie Journey
            </motion.h2>
          </div>

          {/* Signup Form */}
          <div className="p-6 md:p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Username Field */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="username" className="block text-gray-300 mb-2 font-medium">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="movielover123"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="password" className="block text-gray-300 mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>

              {/* Age Field */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <label htmlFor="age" className="block text-gray-300 mb-2 font-medium">
                  Age
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaBirthdayCake className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    min="13"
                    max="120"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="18"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>

              {/* Gender Field */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="gender" className="block text-gray-300 mb-2 font-medium">
                  Gender
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaVenusMars className="text-gray-400" />
                  </div>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700/80 border border-gray-600/50 rounded-lg text-white appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </motion.div>

              {/* Favorite Genres */}
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.55 }}
              >
                <label className="block text-gray-300 mb-3 font-medium">
                  Favorite Movie Genres (Select at least 3)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {genres.map((genre) => (
                    <motion.div
                      key={genre}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center"
                    >
                      <input
                        type="checkbox"
                        id={`genre-${genre}`}
                        className="hidden peer"
                        checked={formData.favoriteGenres.includes(genre)}
                        onChange={() => handleGenreChange(genre)}
                      />
                      <label
                        htmlFor={`genre-${genre}`}
                        className="w-full py-2 px-3 text-sm text-center bg-gray-700/60 border border-gray-600/50 rounded-lg cursor-pointer peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-checked:text-gray-900 hover:bg-gray-600/50 transition-colors"
                      >
                        {genre}
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Terms Agreement */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-start pt-2"
              >
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="focus:ring-yellow-500 h-4 w-4 text-yellow-500 border-gray-600 rounded bg-gray-700"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-gray-300">
                    I agree to the{' '}
                    <Link to="/terms" className="text-yellow-400 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-yellow-400 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </motion.div>
              {error && <div className="text-red-400 text-sm mt-2">{error}</div>}

              {/* Submit Button */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-yellow-400/20"
                >
                  Create Account <FaChevronRight className="ml-2" />
                </motion.button>
              </motion.div>
            </form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                >
                  Log in
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;