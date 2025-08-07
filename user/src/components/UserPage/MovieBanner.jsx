// MovieBanner.jsx
import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useToast } from '../../toast/ToastContext.jsx';

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

const MovieBanner = ({ movies=[] }) => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const { addToast } = useToast();

  const { data } = useQuery(GET_FAVORITES_QUERY);
  const [addToFavorites] = useMutation(ADD_FAVORITE_MUTATION, {
    refetchQueries: [GET_FAVORITES_QUERY],
    onCompleted: (data) => {
      // You may need to adjust this to match your actual mutation response
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
    }, 5000);

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
    // Check if a trailer URL exists before trying to play it
    if (currentMovie?.trailer_url) {
      setShowTrailer(true);
    } else {
      addToast('No trailer available for this movie.', 'info');
    }
  };

  return (
    <div className="relative h-[34rem] rounded-xl overflow-hidden mb-8">
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
          ></iframe>
        </div>
      ) : (
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
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
      
      <div className="relative h-full flex items-end p-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold mb-2">{currentMovie.title}</h2>
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-yellow-400">{currentMovie.vote_average?.toFixed(1) || 'N/A'}/10</span>
            <span>{currentMovie.release_date || 'N/A'}</span>
            <span>{currentMovie.runtime || 'N/A'} min</span>
          </div>
          <p className="text-gray-300 line-clamp-3">{currentMovie.overview || 'N/A'}</p>
          <div className="mt-4 flex space-x-3">
            <button
              onClick={handlePlayTrailer}
              className="px-6 py-2 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-600 transition flex items-center gap-2"
            >
              <FaPlay />
              Watch Trailer
            </button>
            <button
              onClick={handleFavoriteClick}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition ${
                isFavorite
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              {isFavorite ? (
                <>
                  <FaHeart />
                  Remove Favorite
                </>
              ) : (
                <>
                  <FaRegHeart />
                  Add to Favorites
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 right-8 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentBannerIndex(index);
              setShowTrailer(false);
            }}
            className={`w-3 h-3 rounded-full ${index === currentBannerIndex ? 'bg-yellow-400' : 'bg-gray-500'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieBanner;