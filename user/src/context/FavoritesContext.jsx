import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from './authContext.jsx';
import axios from 'axios';

const FavoritesContext = createContext();
const REACT_APP_API_URL="https://movie-recommendation-backend-4780.onrender.com";
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: `${REACT_APP_API_URL}/api`,
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

  const normalizeId = (movieId) => {
    if (!movieId) return null;
    if (typeof movieId === 'object') {
      return movieId.tmdbId || movieId.id || movieId._id;
    }
    return movieId;
  };

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


  const isFavorite = useCallback((movieId) => {
    const normalizedId = normalizeId(movieId);
    if (!normalizedId) return false;
    
    return favorites.some(fav => 
      fav.tmdbId === normalizedId || 
      fav._id === normalizedId ||
      fav.id === normalizedId
    );
  }, [favorites]);

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