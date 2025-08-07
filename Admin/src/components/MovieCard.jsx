import { useState } from 'react';
import { FaTrash, FaPlus, FaEye, FaTimes, FaStar, FaCalendarAlt, FaClock, FaFilm, FaPlay ,FaGlobe} from 'react-icons/fa';

const MovieCard = ({ movie, onAdd, onDelete, isAdded }) => {
  const [showModal, setShowModal] = useState(false);
  const [showTrailerInModal, setShowTrailerInModal] = useState(false); // State for trailer in modal

  const toggleModal = () => {
    setShowModal(!showModal);
    // Reset trailer view when modal closes
    if (showModal) {
      setShowTrailerInModal(false);
    }
  };

  return (
    <>
      {/* Movie Card */}
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 relative group">
        {/* Action Buttons (Add/Remove & View Details) */}
        <div className="absolute top-3 right-3 flex space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {isAdded ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(movie.id);
              }}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-md transform hover:scale-110"
              title="Remove from database"
            >
              <FaTrash className="text-sm" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                // Ensure the full 'movie' object (including trailer_url) is passed to onAdd
                onAdd(movie); 
              }}
              className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors shadow-md transform hover:scale-110"
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
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md transform hover:scale-110"
            title="View details"
          >
            <FaEye className="text-sm" />
          </button>
        </div>

        {/* Movie Poster */}
        <div className="relative pb-[150%] bg-gray-700">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://placehold.co/500x750/374151/ffffff?text=No+Poster'
            }
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
            loading="lazy"
          />
          {/* Rating Overlay */}
          <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md flex items-center text-sm font-semibold">
            <FaStar className="text-yellow-400 mr-1" />
            {movie.vote_average?.toFixed(1) || 'N/A'}
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4 bg-gray-900 text-white">
          <h3 className="font-bold text-lg mb-1 line-clamp-1 hover:text-yellow-400 transition-colors cursor-pointer" onClick={toggleModal}>
            {movie.title}
          </h3>
          
          <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
            <span className="flex items-center">
              <FaCalendarAlt className="mr-1 text-gray-500" />
              {movie.release_date?.split('-')[0] || 'N/A'}
            </span>
            <span className="flex items-center font-medium">
              {movie.genres?.[0]?.name || 'Unknown Genre'}
            </span>
          </div>
          
          <div className="text-gray-300 text-sm space-y-1">
            <p className="flex items-center">
              <FaClock className="mr-2 text-gray-500" />
              <span><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} mins` : 'N/A'}</span>
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
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
                <button 
                  onClick={toggleModal}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                >
                  <FaTimes className="text-white text-xl" />
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                {/* Modal Header: Trailer or Image */}
                <div className="w-full md:w-1/2 relative">
                  {showTrailerInModal && movie.trailer_url ? (
                    <iframe
                      title="movie-trailer"
                      width="100%"
                      height="300px"
                      src={`${movie.trailer_url}?autoplay=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  ) : (
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : 'https://placehold.co/500x750/374151/ffffff?text=No+Poster'
                      }
                      alt={movie.title}
                      className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                  )}
                  {/* "Watch Trailer" button inside the modal header */}
                  {/* Only show if trailer_url exists AND trailer is not already showing */}
                  {!showTrailerInModal && movie.trailer_url && (
                    <button
                      onClick={() => setShowTrailerInModal(true)}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-600 transition flex items-center justify-center shadow-lg"
                    >
                      <FaPlay className="mr-2" /> Watch Trailer
                    </button>
                  )}
                  {/* NEW: Button to show image if trailer is playing */}
                  {showTrailerInModal && (
                    <button
                      onClick={() => setShowTrailerInModal(false)}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 transition flex items-center justify-center shadow-lg"
                    >
                      <FaEye className="mr-2" /> View Poster
                    </button>
                  )}
                </div>
                
                {/* Movie Details */}
                <div className="flex-1 space-y-4">
                  <p className="text-gray-300 leading-relaxed">
                    {movie.overview || 'No overview available.'}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <p className="font-semibold text-gray-400 flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        Release Date
                      </p>
                      <p className="mt-1 text-white">{movie.release_date || 'N/A'}</p>
                    </div>
                    
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <p className="font-semibold text-gray-400 flex items-center">
                        <FaClock className="mr-2" />
                        Runtime
                      </p>
                      <p className="mt-1 text-white">{movie.runtime ? `${movie.runtime} mins` : 'N/A'}</p>
                    </div>
                    
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <p className="font-semibold text-gray-400 flex items-center">
                        <FaStar className="mr-2 text-yellow-400" />
                        Rating
                      </p>
                      <p className="mt-1 text-white">
                        {movie.vote_average?.toFixed(1) || 'N/A'} / 10
                      </p>
                    </div>
                    
                    <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                      <p className="font-semibold text-gray-400">Status</p>
                      <p className="mt-1 text-white">{movie.status || 'N/A'}</p>
                    </div>

                  </div>
                  
                  {/* Genres */}
                  <div className="mb-4">
                    <p className="font-semibold text-gray-400 mb-2">Genres</p>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres && movie.genres.length > 0 ? (
                        movie.genres.map(genre => (
                          <span 
                            key={genre.id} 
                            className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {genre.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </div>
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
