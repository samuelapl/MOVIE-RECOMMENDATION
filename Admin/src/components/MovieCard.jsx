import { useState } from 'react';

const MovieCard = ({ movie, onAdd, onDelete, isAdded }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative">
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-2 z-10">
          {isAdded ? (
            <button
              onClick={() => onDelete(movie.id)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
              title="Remove from database"
            >
              🗑️
            </button>
          ) : (
            <button
              onClick={() => onAdd(movie)}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
              title="Add to database"
            >
              ➕
            </button>
          )}
          <button
            onClick={toggleModal}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
            title="View details"
          >
            👁️
          </button>
        </div>

        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://via.placeholder.com/500x750?text=No+Poster'
          }
          alt={movie.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{movie.title}</h3>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
            <span className="flex items-center">
              ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
            </span>
          </div>
          <div className="text-gray-700 text-sm">
            <p><strong>Runtime:</strong> {movie.runtime || 'N/A'} mins</p>
            <p className="line-clamp-1">
              <strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ') || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Modal for detailed view */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{movie.title}</h2>
                <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full md:w-1/3 h-auto object-cover rounded"
                />
                
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="font-semibold">Release Date</p>
                      <p>{movie.release_date || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Runtime</p>
                      <p>{movie.runtime || 'N/A'} mins</p>
                    </div>
                    <div>
                      <p className="font-semibold">Rating</p>
                      <p>⭐ {movie.vote_average?.toFixed(1) || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Status</p>
                      <p>{movie.status || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="font-semibold">Genres</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {movie.genres?.map(genre => (
                        <span key={genre.id} className="bg-gray-200 px-2 py-1 rounded text-sm">
                          {genre.name}
                        </span>
                      )) || 'N/A'}
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-semibold">Overview</p>
                    <p className="mt-1">{movie.overview || 'No overview available'}</p>
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