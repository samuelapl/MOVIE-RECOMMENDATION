// MovieBanner.js
import React, { useState, useEffect } from 'react';

const MovieBanner = ({ movies }) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    if (movies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  if (movies.length === 0) return null;

  const currentMovie = movies[currentBannerIndex];

  return (
    <div className="relative h-[34rem] rounded-xl overflow-hidden mb-8"> {/* Increased height */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path || currentMovie.poster_path})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.8
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      
      <div className="relative h-full flex items-end p-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-2">{currentMovie.title}</h2>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-yellow-400">{currentMovie.vote_average}/10</span>
            <span>{currentMovie.release_date}</span>
            <span>{currentMovie.runtime} min</span>
          </div>
          <p className="text-gray-300 line-clamp-3">{currentMovie.overview}</p> {/* Increased to 3 lines */}
          <div className="mt-4 flex space-x-3">
            <button className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-600 transition">
              Watch Now
            </button>
            <button className="px-6 py-2 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition">
              + Add to List
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-8 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBannerIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentBannerIndex ? 'bg-yellow-400' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieBanner;