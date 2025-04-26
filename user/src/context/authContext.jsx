import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
const REACT_APP_API_URL="https://movie-recommendation-backend-4780.onrender.com";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Persistent user data in localStorage
  const persistUser = useCallback((userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser({ ...userData, token }); // Store token in user object
  }, []);

  const clearUser = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
  }, []);

  // Verify token and get user data on initial load
  const verifyToken = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        clearUser();
        return false;
      }

      const response = await fetch(`${REACT_APP_API_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error("Token verification failed");
      }

      const data = await response.json();
      
      // Update user data if needed
      if (data.user) {
        persistUser(data.user, token);
      }

      return true;
    } catch (error) {
      console.error("Token verification error:", error);
      clearUser();
      return false;
    }
  }, [clearUser, persistUser]);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      await verifyToken();
      setAuthLoading(false);
    };
    initializeAuth();
  }, [verifyToken]);

  const login = async (credentials) => {
    try {
      setAuthLoading(true);
      const response = await fetch(`${REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      persistUser(data.user, data.token);
      navigate("/user-page");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setAuthLoading(true);
      const response = await fetch(`${REACT_APP_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      persistUser(data.user, data.token);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = useCallback(() => {
    clearUser();
    navigate("/");
  }, [clearUser, navigate]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        authLoading, 
        error,
        login, 
        register, 
        logout,
        isAuthenticated: !!user,
        setError,
        verifyToken // Expose verifyToken for ProtectedRoute
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};