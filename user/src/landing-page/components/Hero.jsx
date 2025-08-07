import React from "react";
import { FaFilm, FaHeart, FaPlay } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          className="w-full h-full object-cover"
          alt="Yellow-themed placeholder"
        />

        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content Center */}
      <div className="w-full max-w-2xl mx-auto px-6 py-16 relative z-10 h-full flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          {/* Animated Film Reel Icon */}
          <div className="flex items-center mb-6 animate-bounce">
            <FaFilm className="text-yellow-400 text-4xl mr-3" />
            <h4 className="text-yellow-400 text-xl md:text-2xl uppercase font-semibold">
              Bruh Picks
            </h4>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="text-yellow-400">Super</span>  Movies
          </h1>

          {/* Subheading */}
          <p className="text-white text-lg md:text-2xl mb-8 leading-relaxed max-w-lg">
          Check out these awesome movies we picked just for you!
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 w-full">
            <button className="px-8 py-3 bg-yellow-400 text-black font-semibold rounded-full hover:bg-yellow-300 transition-all flex items-center justify-center">
              <FaPlay className="mr-2" />
              Get Recommendations
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center">
              <FaHeart className="mr-2" />
              Save Favorites
            </button>
          </div>

         

          {/* Scrolling Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce w-6 h-6 border-4 border-white rounded-full"></div>
          </div>
        </div>
      </div>
    

      {/* Gradient Overlay Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-0"></div>
    </div>
  );
};

export default Hero;
