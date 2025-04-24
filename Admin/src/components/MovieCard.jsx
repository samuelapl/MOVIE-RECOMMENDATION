import { useState } from 'react';
import { FaTrash, FaPlus, FaEye, FaTimes, FaStar, FaCalendarAlt, FaClock, FaFilm } from 'react-icons/fa';

const MovieCard = ({ movie, onAdd, onDelete, isAdded }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      {/* Movie Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group">
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isAdded ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(movie.id);
              }}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-md"
              title="Remove from database"
            >
              <FaTrash className="text-sm" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd(movie);
              }}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-md"
              title="Add to database"
            >
              <FaPlus className="text-sm" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleModal();
            }}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-md"
            title="View details"
          >
            <FaEye className="text-sm" />
          </button>
        </div>

        {/* Movie Poster */}
        <div className="relative pb-[150%] bg-gray-100">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{movie.title}</h3>
          
          <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
            <span className="flex items-center">
              <FaCalendarAlt className="mr-1 text-gray-500" />
              {movie.release_date?.split('-')[0] || 'N/A'}
            </span>
            <span className="flex items-center font-medium">
              <FaStar className="text-yellow-400 mr-1" />
              {movie.vote_average?.toFixed(1) || 'N/A'}
            </span>
          </div>
          
          <div className="text-gray-700 text-sm space-y-1">
            <p className="flex items-center">
              <FaClock className="mr-2 text-gray-500" />
              <span><strong>Runtime:</strong> {movie.runtime || 'N/A'} mins</span>
            </p>
            <p className="flex items-start">
              <FaFilm className="mt-0.5 mr-2 text-gray-500" />
              <span className="line-clamp-1">
                <strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ') || 'N/A'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Modal for detailed view */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{movie.title}</h2>
                <button 
                  onClick={toggleModal}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="text-gray-500 text-xl" />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Movie Poster */}
                <div className="w-full md:w-1/3">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-auto object-cover rounded-lg shadow-md"
                  />
                </div>
                
                {/* Movie Details */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-600 flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        Release Date
                      </p>
                      <p className="mt-1 text-gray-800">{movie.release_date || 'N/A'}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-600 flex items-center">
                        <FaClock className="mr-2" />
                        Runtime
                      </p>
                      <p className="mt-1 text-gray-800">{movie.runtime || 'N/A'} mins</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-600 flex items-center">
                        <FaStar className="mr-2 text-yellow-400" />
                        Rating
                      </p>
                      <p className="mt-1 text-gray-800">
                        {movie.vote_average?.toFixed(1) || 'N/A'} / 10
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-semibold text-gray-600">Status</p>
                      <p className="mt-1 text-gray-800">{movie.status || 'N/A'}</p>
                    </div>
                  </div>
                  
                  {/* Genres */}
                  <div className="mb-6">
                    <p className="font-semibold text-gray-600 mb-2">Genres</p>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres?.map(genre => (
                        <span 
                          key={genre.id} 
                          className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {genre.name}
                        </span>
                      )) || 'N/A'}
                    </div>
                  </div>
                  
                  {/* Overview */}
                  <div>
                    <p className="font-semibold text-gray-600 mb-2">Overview</p>
                    <p className="text-gray-700 leading-relaxed">
                      {movie.overview || 'No overview available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;