import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from './authContext.jsx';
import axios from 'axios';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Create a stable axios instance with auth header
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: 'http://localhost:5000/api',
    });

    instance.interceptors.request.use(config => {
      const token = user?.token || localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  }, [user?.token]); 
  // Normalize movie ID from different possible fields
  const normalizeId = (movieId) => {
    if (!movieId) return null;
    if (typeof movieId === 'object') {
      return movieId.tmdbId || movieId.id || movieId._id;
    }
    return movieId;
  };

  // Fetch user's favorites
  const fetchFavorites = useCallback(async () => {
    if (!user?.token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.get('/favorites');
      setFavorites(response.data.favorites || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, user?.token]);

  // Add a movie to favorites
  const addFavorite = useCallback(async (movieId) => {
    const normalizedId = normalizeId(movieId);
    if (!normalizedId) return;

    try {
      const response = await axiosInstance.post(`/favorites/${normalizedId}`, { 
        movieId: normalizedId 
      });
      setFavorites(response.data.favorites || []);
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  }, [axiosInstance]);

  // Remove a movie from favorites
  const removeFavorite = useCallback(async (movieId) => {
    const normalizedId = normalizeId(movieId);
    if (!normalizedId) return;

    try {
      const response = await axiosInstance.delete(`/favorites/${normalizedId}`);
      setFavorites(response.data.favorites || []);
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  }, [axiosInstance]);

  // Check if a movie is favorited
  const isFavorite = useCallback((movieId) => {
    const normalizedId = normalizeId(movieId);
    if (!normalizedId) return false;
    
    return favorites.some(fav => 
      fav.tmdbId === normalizedId || 
      fav._id === normalizedId ||
      fav.id === normalizedId
    );
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = useCallback(async (movieId) => {
    const normalizedId = normalizeId(movieId);
    if (!normalizedId) return false;

    try {
      if (isFavorite(normalizedId)) {
        await removeFavorite(normalizedId);
        return false;
      } else {
        await addFavorite(normalizedId);
        return true;
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }, [isFavorite, addFavorite, removeFavorite]);

  // Initial fetch and when user/token changes
  useEffect(() => {
    if (user?.token) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user?.token, fetchFavorites]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
        fetchFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);