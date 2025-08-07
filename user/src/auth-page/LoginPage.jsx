import { motion } from "framer-motion";
import { FaFilm, FaLock, FaEnvelope, FaArrowRight, FaTimes, FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from '../context/authContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login({ email, password });
    } catch (err) {
      console.log(err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md z-10"
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
                Welcome Back!
              </h2>
              <p className="text-white/80 mt-2">
                Sign in to continue your movie journey
              </p>
            </motion.div>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
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
                    className="w-full pl-12 pr-4 py-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
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
                    className="w-full pl-12 pr-4 py-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex justify-end mt-3">
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
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
                transition={{ delay: 0.4 }}
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
                        Sign In <FaArrowRight className="ml-2" />
                      </>
                    )}
                  </div>
                </button>
              </motion.div>
            </form>

            {/* Signup Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="text-slate-400">
                New to Roha Picks?{' '}
                <Link 
                  to="/signup" 
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Create account
                </Link>
              </p>
            </motion.div>

            {/* Social Login */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-slate-800/50 text-slate-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-xl" />
                  <div className="relative w-full flex items-center justify-center py-3 px-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-600/50 transition-all duration-300">
                    <FaGoogle className="mr-2" />
                    Google
                  </div>
                </button>
                
                <button
                  type="button"
                  className="group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-xl" />
                  <div className="relative w-full flex items-center justify-center py-3 px-4 bg-slate-700/50 backdrop-blur-md border border-slate-600/50 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-600/50 transition-all duration-300">
                    <FaFacebook className="mr-2" />
                    Facebook
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
