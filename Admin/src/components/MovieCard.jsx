const MovieCard = ({ movie }) => {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
          <p className="text-gray-700 text-sm line-clamp-2">{movie.overview}</p>
        </div>
      </div>
    );
  };
  
  export default MovieCard;