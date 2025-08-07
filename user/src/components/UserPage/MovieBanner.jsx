import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaPlay, FaImage, FaStar, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useToast } from '../../toast/ToastContext.jsx';

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

const MovieBanner = ({ movies = [] }) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToast } = useToast();

  const { data } = useQuery(GET_FAVORITES_QUERY);
  const [addToFavorites] = useMutation(ADD_FAVORITE_MUTATION, {
    refetchQueries: [GET_FAVORITES_QUERY],
    onCompleted: () => {
      addToast(`${currentMovie?.title} added to favorites!`, 'success');
    },
    onError: (error) => {
      addToast(`Failed to add movie: ${error.message}`, 'error');
    }
  });
  const [removeFromFavorites] = useMutation(REMOVE_FAVORITE_MUTATION, {
    refetchQueries: [GET_FAVORITES_QUERY],
    onCompleted: () => {
      addToast(`${currentMovie?.title} removed from favorites!`, 'error');
    },
    onError: (error) => {
      addToast(`Failed to remove movie: ${error.message}`, 'error');
    }
  });

  if (movies.length === 0) {
    return null;
  }
  
  const currentMovie = movies[currentBannerIndex];
  const movieId = Number(currentMovie.id);

  const favoriteMovieIds = data?.getFavorites?.favorites.map(fav => Number(fav.id)) || [];
  const isFavorite = favoriteMovieIds.includes(movieId);

  useEffect(() => {
    if (movies.length <= 1 || showTrailer) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % movies.length);
      setImageLoaded(false);
    }, 6000);

    return () => clearInterval(interval);
  }, [movies.length, showTrailer]);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites({ variables: { movieId } });
      } else {
        await addToFavorites({ variables: { movieId } });
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  const handlePlayTrailer = () => {
    if (currentMovie?.trailer_url) {
      setShowTrailer(true);
    } else {
      addToast('No trailer available for this movie.', 'info');
    }
  };

  return (
    <div className="relative h-[500px] sm:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden group">
      {/* Background Image/Video */}
      {showTrailer && currentMovie.trailer_url ? (
        <div className="absolute inset-0">
          <iframe
            title="movie-trailer"
            width="100%"
            height="100%"
            src={`${currentMovie.trailer_url}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-3xl"
          />
        </div>
      ) : (
        <>
          {/* Loading Skeleton */}
          <div className={`absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 animate-pulse transition-opacity duration-500 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`} />
          
          {/* Background Image */}
           <div className="absolute inset-0 overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path || currentMovie.poster_path}`}
              alt={currentMovie.title}
              className={`w-full h-full object-cover transition-all duration-1000 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
          </div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
        </>
      )}
      
      {/* Content */}
      <div className="relative h-full flex items-end p-8 lg:p-12">
        <div className="max-w-3xl space-y-6">
          {/* Movie Title */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
              {currentMovie.title}
            </h1>
            
            {/* Movie Stats */}
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <FaStar className="text-amber-400" />
                <span className="font-semibold">{currentMovie.vote_average?.toFixed(1) || 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <FaCalendarAlt className="text-blue-400" />
                <span>{currentMovie.release_date?.split('-')[0] || 'N/A'}</span>
              </div>
              {currentMovie.runtime && (
                <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  <FaClock className="text-green-400" />
                  <span>{currentMovie.runtime} min</span>
                </div>
              )}
            </div>
          </div>

          {/* Overview */}
          <p className="text-lg text-white/90 leading-relaxed max-w-2xl line-clamp-3 drop-shadow-lg">
            {currentMovie.overview || 'No overview available.'}
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {showTrailer ? (
              <button
                onClick={() => setShowTrailer(false)}
                className="px-8 py-4 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl font-semibold hover:bg-white/30 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl"
              >
                <FaImage className="text-xl" />
                <span>View Poster</span>
              </button>
            ) : (
              <button
                onClick={handlePlayTrailer}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl shadow-purple-500/25"
              >
                <FaPlay className="text-xl" />
                <span>Watch Trailer</span>
              </button>
            )}
            
            <button
              onClick={handleFavoriteClick}
              className={`px-8 py-4 backdrop-blur-md border rounded-2xl font-semibold hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl ${
                isFavorite
                  ? 'bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              {isFavorite ? (
                <>
                  <FaHeart className="text-xl" />
                  <span>Remove Favorite</span>
                </>
              ) : (
                <>
                  <FaRegHeart className="text-xl" />
                  <span>Add to Favorites</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Navigation Dots */}
      {movies.length > 1 && (
        <div className="absolute bottom-6 right-8 flex space-x-3">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentBannerIndex(index);
                setShowTrailer(false);
                setImageLoaded(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBannerIndex 
                  ? 'bg-white scale-125 shadow-lg' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieBanner;
