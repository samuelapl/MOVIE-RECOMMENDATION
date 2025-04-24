import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaInfoCircle, FaTimes } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300">
        <div className="relative">
          <img 
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-2 bg-gray-900/70 rounded-full hover:bg-gray-900"
            >
              {isFavorite ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-white" />
              )}
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="p-2 bg-gray-900/70 rounded-full hover:bg-gray-900"
            >
              <FaInfoCircle className="text-white" />
            </button>
          </div>
          <div className="absolute bottom-2 left-2 flex items-center bg-gray-900/70 px-2 py-1 rounded">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{movie.vote_average}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 truncate">{movie.title}</h3>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{movie.release_date}</span>
            <span>{movie.genres?.[0]?.name || 'Unknown Genre'}</span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 bg-gray-900 rounded-full hover:bg-gray-700 z-10"
              >
                <FaTimes className="text-white" />
              </button>
              
              <div className="relative h-64 w-full">
                <img 
                   src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Poster'
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold">{movie.title}</h2>
                <div className="flex items-center bg-gray-700 px-3 py-1 rounded-full">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-medium">{movie.vote_average}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres?.map(genre => (
                  <span key={genre.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-gray-400 text-sm">Release Date</h4>
                  <p>{movie.release_date}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm">Runtime</h4>
                  <p>{movie.runtime} minutes</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm">Status</h4>
                  <p>{movie.status || 'Unknown'}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm">Language</h4>
                  <p>{movie.original_language?.toUpperCase() || 'Unknown'}</p>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Overview</h3>
                <p className="text-gray-300">{movie.overview || 'No overview available.'}</p>
              </div>

              <div className="flex space-x-3">
                <button className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-600 transition">
                  Watch Now
                </button>
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="px-6 py-2 bg-gray-700 rounded-lg font-medium hover:bg-gray-600 transition flex items-center"
                >
                  {isFavorite ? (
                    <>
                      <FaHeart className="text-red-500 mr-2" />
                      Remove from Favorites
                    </>
                  ) : (
                    <>
                      <FaRegHeart className="mr-2" />
                      Add to Favorites
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