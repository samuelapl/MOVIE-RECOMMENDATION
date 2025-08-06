import React, { useState, useRef } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaInfoCircle, FaTimes, FaPlay } from 'react-icons/fa';
import { gql, useQuery, useMutation } from '@apollo/client';


// GraphQL Query to get the user's favorite movie IDs
const GET_FAVORITES_QUERY = gql`
  query GetUserFavorites {
    getFavorites {
      favorites {
        id
      }
    }
  }
`;

// GraphQL Mutation to add a movie to favorites
const ADD_FAVORITE_MUTATION = gql`
  mutation AddToFavorites($movieId: Int!) {
    addToFavorites(movieId: $movieId) {
      favorites {
        id
      }
    }
  }
`;

// GraphQL Mutation to remove a movie from favorites
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
  // State to control the visibility of the movie details modal
  const [showModal, setShowModal] = useState(false);
  // Ref to prevent multiple rapid clicks on the favorite button
  const isHandlingClick = useRef(false);

  // Determine the movie ID. It can come from different properties
  // depending on where the movie data originated (TMDB ID, MongoDB ID).
  // Ensure it's converted to a Number for GraphQL mutations.
  const movieId = Number(movie.tmdbId || movie.id || movie._id);
  
  // Use Apollo's useQuery hook to fetch the current user's favorite movie IDs.
  // This data is used to determine if the current movie is a favorite.
  const { data } = useQuery(GET_FAVORITES_QUERY);
  const favoriteMovieIds = data?.getFavorites?.favorites.map(fav => Number(fav.id)) || [];
  
  // Check if the current movie's ID exists in the list of favorite IDs.
  // This 'isFavorite' is now a boolean, not a function.
  const isFavorite = favoriteMovieIds.includes(movieId);

  // Use Apollo's useMutation hook for adding a movie to favorites.
  // 'variables' are the arguments passed to the mutation.
  // 'refetchQueries' ensures the GET_FAVORITES_QUERY is run again after mutation
  // to update the UI with the latest favorite status.
  const [addToFavorites] = useMutation(ADD_FAVORITE_MUTATION, {
    variables: { movieId: movieId }, // Pass the numeric movieId
    refetchQueries: [GET_FAVORITES_QUERY], 
  });
  
  // Use Apollo's useMutation hook for removing a movie from favorites.
  const [removeFromFavorites] = useMutation(REMOVE_FAVORITE_MUTATION, {
    variables: { movieId: movieId }, // Pass the numeric movieId
    refetchQueries: [GET_FAVORITES_QUERY],
  });

  // Handler for when the favorite button is clicked.
  const handleFavoriteClick = async (e) => {
    e.stopPropagation(); // Prevent the card click event from firing
    // Prevent multiple rapid clicks
    if (isHandlingClick.current) return;
    
    isHandlingClick.current = true; // Set flag to true

    try {
      if (isFavorite) { // 'isFavorite' is a boolean, use directly
        await removeFromFavorites();
      } else {
        await addToFavorites();
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    } finally {
      isHandlingClick.current = false; // Reset flag after operation
    }
  };

  return (
    <>
      {/* Main Movie Card Display */}
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl">
        <div className="relative">
          {/* Movie Poster */}
          <img 
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Poster'
            }
            alt={movie.title}
            className="w-full h-64 sm:h-72 md:h-80 object-cover cursor-pointer"
            onClick={() => setShowModal(true)} // Opens the modal on image click
            loading="lazy"
          />
          {/* Red Heart Icon for Favorited Movies */}
          {isFavorite && (
            <div className="absolute top-2 right-2 text-red-500 text-3xl">
              <FaHeart />
            </div>
          )}
          {/* Overlay for "View Details" button on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button 
              onClick={() => setShowModal(true)} // Opens the modal
              className="flex items-center justify-center w-full py-2 bg-yellow-500 text-gray-900 rounded font-medium hover:bg-yellow-600 transition"
            >
              <FaPlay className="mr-2" /> View Details
            </button>
          </div>
          {/* Favorite Button on the card */}
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button 
              onClick={handleFavoriteClick}
              className="p-2 bg-gray-900/80 rounded-full hover:bg-gray-900 transition-colors backdrop-blur-sm"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? ( // 'isFavorite' is a boolean, use directly
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FaRegHeart className="text-white text-lg" />
              )}
            </button>
          </div>
          {/* Rating Display */}
          <div className="absolute bottom-2 left-2 flex items-center bg-gray-900/80 px-2 py-1 rounded backdrop-blur-sm">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{movie.vote_average?.toFixed(1)}</span>
          </div>
        </div>
        {/* Movie Title and Release Year/Genre */}
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
            {/* Close Modal Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 bg-gray-900 rounded-full hover:bg-gray-700 z-10 transition-colors"
              aria-label="Close modal"
            >
              <FaTimes className="text-white text-xl" />
            </button>
            
            {/* Modal Header with Backdrop Image and Title */}
            <div className="relative h-64 sm:h-80 w-full">
              <img 
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` // Using poster_path for simplicity, ideally use backdrop_path
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

            {/* Modal Content */}
            <div className="p-6">
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres?.map(genre => (
                  <span key={genre.id} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                    {genre.name}
                  </span>
                ))}
              </div>

              {/* Overview */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>

              {/* Additional Details */}
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

              {/* Action Buttons in Modal */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button className="px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-medium hover:bg-yellow-600 transition flex items-center justify-center">
                  <FaPlay className="mr-2" /> Watch Trailer
                </button>
                <button 
                  onClick={handleFavoriteClick}
                  className={`px-6 py-3 rounded-lg font-medium transition flex items-center justify-center ${
                    isFavorite // 'isFavorite' is a boolean, use directly
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {isFavorite ? ( // 'isFavorite' is a boolean, use directly
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
