import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from './authContext.jsx';
import axios from 'axios';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, authLoading } = useAuth();
  console.log("FavoritesProvider - User:", user); // Debug log
  console.log("FavoritesProvider - AuthLoading:", authLoading); // Debug log
  
  // Stable axios instance
  const axiosInstance = useMemo(() => axios.create({
    baseURL: 'http://localhost:5000/api/',
  }), []);

  // Stable fetchFavorites
  const fetchFavorites = useCallback(async () => {
    if (!user?.token) {
      console.error('No token available');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await axiosInstance.get('/favorites', {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [user?.token, axiosInstance]);

  const addFavorite = async (movieId) => {
    try {
      const response = await axiosInstance.post('/favorites', { movieId }, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json'
        }
      });
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  };

  const removeFavorite = async (movieId) => {
    try {
      const response = await axiosInstance.delete(`/favorites/${movieId}`, {
        headers: {
          'Authorization': `Bearer ${user?.token}`,
          'Content-Type': 'application/json'
        }
      });
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  };

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.tmdbId === movieId || movie._id === movieId);
  };

  const toggleFavorite = async (movieId) => {
    try {
      if (isFavorite(movieId)) {
        await removeFavorite(movieId);
      } else {
        await addFavorite(movieId);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  };
  useEffect(() => {
    if (authLoading) return;
    
    if (user?.token) {
      fetchFavorites();
    } else {
      setFavorites([]);
      setLoading(false);
    }
  }, [user?.token, authLoading, fetchFavorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, loading, addFavorite, removeFavorite, isFavorite, toggleFavorite, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);