import React from "react";
import { motion } from "framer-motion";
import { FaFilm, FaHeart, FaPlay, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, purple 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, pink 0%, transparent 50%)`,
        }} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center py-12 px-4">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 md:mb-8"
        >
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Super
            </span>{" "}
            <span className="text-white">Movies</span>
          </h1>
          <div className="flex items-center justify-center space-x-2 text-xl md:text-3xl text-slate-300">
            <FaStar className="text-yellow-400" />
            <span>Chosen just for you</span>
            <FaStar className="text-yellow-400" />
          </div>
        </motion.div>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto"
        >
          Discover amazing movies handpicked by us.  
          From blockbusters to hidden gems, find your next favorite film.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
        >
          <Link to="/signup">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center space-x-3 hover:scale-105 shadow-2xl shadow-purple-500/25">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative flex items-center space-x-3">
                <FaPlay />
                <span>Get Recommendations</span>
              </div>
            </button>
          </Link>
          
          <Link to="/login">
            <button className="group px-8 py-4 bg-slate-800/50 backdrop-blur-xl border border-slate-600/50 text-white font-semibold rounded-2xl hover:bg-slate-700/50 hover:border-purple-500/50 transition-all duration-300 flex items-center space-x-3 hover:scale-105">
              <FaHeart className="text-pink-400" />
              <span>Browse Movies</span>
            </button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-3 gap-5 md:gap-8 max-w-2xl mx-auto"
        >
          {[
            { number: "1000+", label: "Chosen Movies" },
            { number: "100%", label: "User Satisfaction" },
            { number: "8.5+/10", label: "User Rated Movies" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-slate-400 text-xs md:text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-slate-400 text-sm">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;