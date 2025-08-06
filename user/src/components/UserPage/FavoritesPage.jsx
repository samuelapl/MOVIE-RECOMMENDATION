import { gql, useQuery } from '@apollo/client';
import MovieCard from './MovieCard.jsx';

// Define the GraphQL query to fetch favorite movies
const GET_FAVORITES_QUERY = gql`
  query GetUserFavorites {
    getFavorites {
      favorites {
        id
        title
        poster_path
        vote_average
        release_date
        genres {
          name
        }
      }
    }
  }
`;

const FavoritesPage = () => {
  // useQuery hook automatically fetches data when the component mounts
  const { data, loading, error } = useQuery(GET_FAVORITES_QUERY);
  
  // Extract the favorites array from the query response
  const favorites = data?.getFavorites?.favorites || [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Your Favorite Movies</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">You haven't added any favorites yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;