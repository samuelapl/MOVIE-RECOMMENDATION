import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaTimes, FaPlay, FaImage, FaCalendarAlt, FaClock } from 'react-icons/fa';
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
  const [imageLoaded, setImageLoaded] = useState(false);
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
    e.preventDefault();
    e.stopPropagation();
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
      {/* Enhanced Movie Card */}
      <div className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 ease-out">
        
        {/* Loading Overlay */}
        {isUpdatingFavorite && (
          <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-2xl">
            <div className="bg-white/10 backdrop-blur-md rounded-full p-4">
              <BiLoaderAlt className="animate-spin text-purple-400 text-3xl" />
            </div>
          </div>
        )}

        <div className="relative overflow-hidden">
          {/* Movie Poster */}
          <div className="relative h-72 sm:h-80 md:h-96 cursor-pointer overflow-hidden"
               onClick={() => setShowModal(true)}>
            <div className={`absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent transition-opacity duration-300 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
              <div className="animate-pulse bg-slate-700 h-full w-full" />
            </div>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Poster'
              }
              alt={movie.title}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-3 left-3 flex items-center bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <FaStar className="text-amber-400 mr-1.5 text-sm" />
            <span className="text-sm font-semibold text-white">{movie.vote_average?.toFixed(1)}</span>
          </div>

          {/* Favorite Button */}
          <div className="absolute top-3 right-3 z-20">
            <button
              onClick={handleFavoriteClick}
              className="p-2.5 bg-black/60 backdrop-blur-md rounded-full hover:bg-black/80 transition-all duration-300 border border-white/10 hover:scale-110 group/fav"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? (
                <FaHeart className="text-red-500 text-lg group-hover/fav:scale-110 transition-transform" />
              ) : (
                <FaRegHeart className="text-white text-lg group-hover/fav:scale-110 transition-transform" />
              )}
            </button>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-4 hover:bg-white/30 hover:scale-110 transition-all duration-300"
            >
              <FaPlay className="text-white text-xl ml-1" />
            </button>
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4 space-y-3">
          <h3 className="font-bold text-lg text-white truncate hover:text-purple-400 transition-colors cursor-pointer group-hover:text-purple-300" 
              onClick={() => setShowModal(true)}>
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-slate-400">
            <div className="flex items-center space-x-1">
              <FaCalendarAlt className="text-xs" />
              <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
            </div>
            <div className="flex items-center space-x-1 truncate max-w-[120px]">
              <span className="truncate">
                {movie.genres?.[0]?.name || 'Unknown'}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 z-10 transition-all duration-300 border border-white/10"
              aria-label="Close modal"
            >
              <FaTimes className="text-white text-xl" />
            </button>
            
            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row">
              {/* Media Section */}
              <div className="relative lg:w-2/3 h-64 sm:h-80 lg:h-[600px]">
                {showTrailerInModal && movie.trailer_url ? (
                  <iframe
                    title="movie-trailer"
                    width="100%"
                    height="100%"
                    src={`${movie.trailer_url}?autoplay=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
                  />
                ) : (
                  <>
                    <img
                      src={
                        movie.backdrop_path
                          ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                          : movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : 'https://via.placeholder.com/1920x1080?text=No+Image'
                      }
                      alt={movie.title}
                      className="w-full h-full object-cover rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  </>
                )}
              </div>

              {/* Info Section */}
              <div className="lg:w-1/3 p-8 space-y-6 overflow-y-auto">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-3">{movie.title}</h2>
                  <div className="flex items-center space-x-4 text-sm text-slate-300">
                    <div className="flex items-center space-x-1 bg-amber-500/20 px-2 py-1 rounded-full">
                      <FaStar className="text-amber-400" />
                      <span className="font-medium">{movie.vote_average?.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FaCalendarAlt />
                      <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
                    </div>
                    {movie.runtime && (
                      <div className="flex items-center space-x-1">
                        <FaClock />
                        <span>{movie.runtime}m</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map(genre => (
                    <span key={genre.id} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300">
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Overview */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-white">Overview</h3>
                  <p className="text-slate-300 leading-relaxed">
                    {movie.overview || 'No overview available.'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      if (movie.trailer_url) {
                        setShowTrailerInModal(!showTrailerInModal);
                      } else {
                        addToast('No trailer available for this movie.', 'info');
                      }
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-purple-500/25"
                  >
                    {showTrailerInModal ? (
                      <>
                        <FaImage />
                        <span>View Poster</span>
                      </>
                    ) : (
                      <>
                        <FaPlay />
                        <span>Watch Trailer</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleFavoriteClick}
                    className={`w-full px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 border ${
                      isFavorite
                        ? 'bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                        : 'bg-slate-700/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/70'
                    }`}
                  >
                    {isFavorite ? (
                      <>
                        <FaHeart />
                        <span>Remove Favorite</span>
                      </>
                    ) : (
                      <>
                        <FaRegHeart />
                        <span>Add Favorite</span>
                      </>
                    )}
                  </button>
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
