// MovieCard.jsx
import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaTimes, FaPlay, FaImage } from 'react-icons/fa';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useToast } from '../../toast/ToastContext.jsx';
import { BiLoaderAlt } from 'react-icons/bi';

// GraphQL Queries and Mutations
const GET_FAVORITES_QUERY = gql`
  query GetUserFavorites {
    getFavorites {
      favorites {
        id
      }
    }
  }
`;

const ADD_FAVORITE_MUTATION = gql`
  mutation AddToFavorites($movieId: Int!) {
    addToFavorites(movieId: $movieId) {
      favorites {
        id
      }
    }
  }
`;

const REMOVE_FAVORITE_MUTATION = gql`
  mutation RemoveFromFavorites($movieId: Int!) {
    removeFromFavorites(movieId: $movieId) {
      favorites {
        id
      }
    }
  }
`;

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const [showTrailerInModal, setShowTrailerInModal] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const { addToast } = useToast(); 

  const movieId = Number(movie.tmdbId || movie.id || movie._id);

  const { data } = useQuery(GET_FAVORITES_QUERY);
  const favoriteMovieIds = data?.getFavorites?.favorites.map(fav => Number(fav.id)) || [];
  const isFavorite = favoriteMovieIds.includes(movieId);

  const [addToFavorites] = useMutation(ADD_FAVORITE_MUTATION, {
    refetchQueries: [GET_FAVORITES_QUERY],
    onCompleted: () => {
      addToast(`${movie.title} added to favorites!`, 'success');
      setIsUpdatingFavorite(false);
    },
    onError: (error) => {
      addToast(`Failed to add movie: ${error.message}`, 'error');
      setIsUpdatingFavorite(false);
    }
  });

  const [removeFromFavorites] = useMutation(REMOVE_FAVORITE_MUTATION, {
    refetchQueries: [GET_FAVORITES_QUERY],
    onCompleted: () => {
      addToast(`${movie.title} removed from favorites!`, 'error');
      setIsUpdatingFavorite(false);
    },
    onError: (error) => {
      addToast(`Failed to remove movie: ${error.message}`, 'error');
      setIsUpdatingFavorite(false);
    }
  });

 const handleFavoriteClick = async (e) => {
  e.preventDefault();  // Add this
  e.stopPropagation(); // Keep this
  if (isUpdatingFavorite) return;
  
  setIsUpdatingFavorite(true);
  try {
    if (isFavorite) {
      await removeFromFavorites({ variables: { movieId } });
    } else {
      await addToFavorites({ variables: { movieId } });
    }
  } catch (error) {
    console.error("Failed to toggle favorite:", error);
    setIsUpdatingFavorite(false);
  }
};

  useEffect(() => {
    if (!showModal) {
      setShowTrailerInModal(false);
    }
  }, [showModal]);

  return (
    <>
      {/* Main Movie Card Display */}
      <div className="relative bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl">
        
        {/* Loading Overlay */}
        {isUpdatingFavorite && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-900/70 backdrop-blur-sm">
            <BiLoaderAlt className="animate-spin text-yellow-400 text-4xl" />
          </div>
        )}

        <div className="relative">
          <div className="w-full h-64 sm:h-72 md:h-80 object-cover cursor-pointer relative"
               onClick={() => setShowModal(true)}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Poster'
              }
              alt={movie.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          <div className="absolute top-2 left-2 flex items-center bg-gray-900/80 px-2 py-1 rounded backdrop-blur-sm z-10">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{movie.vote_average?.toFixed(1)}</span>
          </div>

      <div className="absolute top-2 right-2 flex flex-col space-y-2 z-20"> {/* Increased z-index */}
  <button
    onClick={handleFavoriteClick}
    className="p-2 bg-gray-900/80 rounded-full hover:bg-gray-900 transition-colors backdrop-blur-sm 
               pointer-events-auto cursor-pointer" // Added cursor-pointer and pointer-events-auto
    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    onMouseDown={e => e.stopPropagation()}
  >
    {isFavorite ? (
      <FaHeart className="text-red-500 text-lg hover:scale-110 transition-transform" />
    ) : (
      <FaRegHeart className="text-white text-lg hover:scale-110 transition-transform" />
    )}
  </button>
</div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4 z-10">
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center w-full py-2 bg-yellow-500 text-gray-900 rounded font-medium hover:bg-yellow-600 transition"
            >
              <FaPlay className="mr-2" /> View Details
            </button>
          </div>
        </div>
        <div className={`p-4 ${isFavorite ? 'bg-red-800' : 'bg-gray-800'} transition-colors duration-300`}>
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
              {showTrailerInModal && movie.trailer_url ? (
                <iframe
                  title="movie-trailer"
                  width="100%"
                  height="100%"
                  src={`${movie.trailer_url}?autoplay=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                ></iframe>
              ) : (
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/1920x1080?text=No+Backdrop'
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  loading="lazy"
                />
              )}
              {!showTrailerInModal && (
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/30 to-transparent" />
              )}
              <div className="absolute bottom-0 left-0 p-6 z-10">
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

              <div className="flex items-center gap-8 mb-4">
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Runtime</h4>
                  <p>{movie.runtime ? `${movie.runtime} minutes` : 'N/A'}</p>
                </div>
                <div>
                  <h4 className="text-gray-400 text-sm mb-1">Status</h4>
                  <p>{movie.status || 'N/A'}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={() => {
                    if (movie.trailer_url) {
                      setShowTrailerInModal(!showTrailerInModal);
                    } else {
                      addToast('No trailer available for this movie.', 'info');
                    }
                  }}
                  className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-600 transition flex items-center justify-center"
                >
                  {showTrailerInModal ? (
                    <>
                      <FaImage className="mr-2" /> View Poster
                    </>
                  ) : (
                    <>
                      <FaPlay className="mr-2" /> Watch Trailer
                    </>
                  )}
                </button>
                <button
                  onClick={handleFavoriteClick}
                  className={`px-6 py-3 rounded-lg font-medium transition flex items-center justify-center ${
                    isFavorite
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {isFavorite ? (
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