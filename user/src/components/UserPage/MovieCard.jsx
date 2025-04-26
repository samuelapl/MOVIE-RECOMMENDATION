import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaInfoCircle, FaTimes, FaPlay } from 'react-icons/fa';
import { useFavorites } from '../../context/FavoritesContext.jsx';

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const movieId = movie.tmdbId || movie.id || movie._id;
  
  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    try {
      await toggleFavorite(movieId);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <>
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl">
        <div className="relative">
          <img 
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={movie.title}
            className="w-full h-64 sm:h-72 md:h-80 object-cover cursor-pointer"
            onClick={() => setShowModal(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center w-full py-2 bg-yellow-500 text-gray-900 rounded font-medium hover:bg-yellow-600 transition"
            >
              <FaPlay className="mr-2" /> View Details
            </button>
          </div>
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button 
              onClick={handleFavoriteClick}
              className="p-2 bg-gray-900/80 rounded-full hover:bg-gray-900 transition-colors backdrop-blur-sm"
              aria-label={isFavorite(movieId) ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite(movieId) ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FaRegHeart className="text-white text-lg" />
              )}
            </button>
          </div>
          <div className="absolute bottom-2 left-2 flex items-center bg-gray-900/80 px-2 py-1 rounded backdrop-blur-sm">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{movie.vote_average?.toFixed(1)}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 truncate hover:text-yellow-400 transition-colors cursor-pointer" onClick={() => setShowModal(true)}>
            {movie.title}
          </h3>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
            <span className="truncate max-w-[120px]">
              {movie.genres?.[0]?.name || 'Unknown Genre'}
            </span>
          </div>
        </div>
      </div>

      {/* Movie Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-gray-900 rounded-full hover:bg-gray-700 z-10 transition-colors"
              aria-label="Close modal"
            >
              <FaTimes className="text-white text-xl" />
            </button>
            
            <div className="relative h-64 sm:h-80 w-full">
              <img 
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/1920x1080?text=No+Backdrop'
                }
                alt={movie.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">{movie.title}</h2>
                <div className="flex items-center mt-2">
                  <div className="flex items-center bg-gray-800/90 px-3 py-1 rounded-full backdrop-blur-sm mr-3">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-medium">{movie.vote_average?.toFixed(1)}</span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    {movie.release_date?.split('-')[0] || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map(genre => (
                  <span key={genre.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Runtime</h4>
                  <p>{movie.runtime ? `${movie.runtime} minutes` : 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Status</h4>
                  <p>{movie.status || 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Language</h4>
                  <p>{movie.original_language?.toUpperCase() || 'N/A'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-600 transition flex items-center justify-center">
                  <FaPlay className="mr-2" /> Watch Trailer
                </button>
                <button 
                  onClick={handleFavoriteClick}
                  className={`px-6 py-3 rounded-lg font-medium transition flex items-center justify-center ${
                    isFavorite(movieId) 
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {isFavorite(movieId) ? (
                    <>
                      <FaHeart className="mr-2" />
                      Remove Favorite
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="mr-2" />
                      Add Favorite
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;