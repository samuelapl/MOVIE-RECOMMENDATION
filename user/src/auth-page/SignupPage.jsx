import { motion } from "framer-motion";
import { FaFilm, FaUser, FaEnvelope, FaLock, FaBirthdayCake, FaVenusMars, FaChevronRight, FaTimes, FaCheck } from "react-icons/fa";
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
  const [isLoading, setIsLoading] = useState(false);
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
    if (formData.favoriteGenres.length < 3) {
      setError('Please select at least 3 favorite genres');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await register(formData);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const genres = [
    { name: "Action", gradient: "from-red-500 to-orange-500" },
    { name: "Comedy", gradient: "from-yellow-500 to-orange-500" },
    { name: "Drama", gradient: "from-blue-500 to-purple-500" },
    { name: "Science Fiction", gradient: "from-cyan-500 to-blue-500" },
    { name: "Horror", gradient: "from-red-600 to-black" },
    { name: "Romance", gradient: "from-pink-500 to-red-500" },
    { name: "Thriller", gradient: "from-gray-600 to-gray-800" },
    { name: "Documentary", gradient: "from-green-500 to-teal-500" },
    { name: "Animation", gradient: "from-purple-500 to-pink-500" },
    { name: "Fantasy", gradient: "from-indigo-500 to-purple-500" },
    { name: "Mystery", gradient: "from-slate-600 to-slate-800" },
    { name: "Crime", gradient: "from-red-700 to-gray-800" },
    { name: "Adventure", gradient: "from-emerald-500 to-teal-500" },
    { name: "Musical", gradient: "from-violet-500 to-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, purple 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, pink 0%, transparent 50%)`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Close Button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 right-6 z-20 p-3 bg-slate-800/50 backdrop-blur-md border border-slate-600/50 rounded-full text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
      >
        <FaTimes className="text-xl" />
      </button>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl z-10"
      >
        <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-center overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 30% 30%, white 0%, transparent 50%)`,
              }} />
            </div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mr-4">
                  <FaFilm className="text-3xl text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl font-bold text-white">Roha Picks</h1>
                  <p className="text-white/80 text-sm">Movie Platform</p>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Start Your Movie Journey
              </h2>
              <p className="text-white/80 mt-2">
                Create your account and discover amazing films
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="username" className="block text-white mb-3 font-medium">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full pl-12 pr-4 py-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                    placeholder="movielover123"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-white mb-3 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full pl-12 pr-4 py-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="password" className="block text-white mb-3 font-medium">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaLock className="text-slate-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full pl-12 pr-4 py-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </motion.div>

              {/* Age and Gender Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Age Field */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <label htmlFor="age" className="block text-white mb-3 font-medium">
                    Age
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaBirthdayCake className="text-slate-400" />
                    </div>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      min="13"
                      max="120"
                      className="w-full pl-12 pr-4 py-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                      placeholder="18"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </motion.div>

                {/* Gender Field */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label htmlFor="gender" className="block text-white mb-3 font-medium">
                    Gender
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaVenusMars className="text-slate-400" />
                    </div>
                    <select
                      id="gender"
                      name="gender"
                      className="w-full pl-12 pr-4 py-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
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
              </div>

              {/* Favorite Genres */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <label className="block text-white mb-4 font-medium">
                  Favorite Movie Genres 
                  <span className="text-slate-400 text-sm ml-2">
                    (Select at least 3 - {formData.favoriteGenres.length} selected)
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {genres.map((genre) => (
                    <motion.div
                      key={genre.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative"
                    >
                      <input
                        type="checkbox"
                        id={`genre-${genre.name}`}
                        className="hidden peer"
                        checked={formData.favoriteGenres.includes(genre.name)}
                        onChange={() => handleGenreChange(genre.name)}
                      />
                      <label
                        htmlFor={`genre-${genre.name}`}
                        className={`relative block w-full py-3 px-4 text-sm text-center bg-slate-700/30 backdrop-blur-md border border-slate-600/50 rounded-xl cursor-pointer transition-all duration-300 peer-checked:border-purple-500/50 hover:bg-slate-600/30 ${
                          formData.favoriteGenres.includes(genre.name)
                            ? 'text-white shadow-lg'
                            : 'text-slate-300'
                        }`}
                      >
                        {formData.favoriteGenres.includes(genre.name) && (
                          <>
                            <div className={`absolute inset-0 bg-gradient-to-r ${genre.gradient} opacity-20 rounded-xl`} />
                            <FaCheck className="absolute top-2 right-2 text-purple-400 text-xs" />
                          </>
                        )}
                        <span className="relative z-10">{genre.name}</span>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Terms Agreement */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-start pt-2"
              >
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="w-5 h-5 text-purple-500 bg-slate-700/50 border-slate-600/50 rounded focus:ring-purple-500/50 focus:ring-2"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-slate-300">
                    I agree to the{' '}
                    <Link to="/terms" className="text-purple-400 hover:text-purple-300 underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative w-full group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative w-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-2xl shadow-purple-500/25 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed">
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    ) : (
                      <>
                        Create Account <FaChevronRight className="ml-2" />
                      </>
                    )}
                  </div>
                </button>
              </motion.div>
            </form>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-8 text-center"
            >
              <p className="text-slate-400">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Sign in here
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
