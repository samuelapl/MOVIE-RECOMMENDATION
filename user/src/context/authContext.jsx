import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Configuration - should be in environment variables in production
const API_BASE_URL = "https://movie-recommendation-backend-4780.onrender.com";
const ADMIN_FRONTEND_URL = "https://movie-recommendation-admin.onrender.com";
const USER_FRONTEND_URL = window.location.origin; // Current user frontend URL

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Save user data to localStorage and state
  const persistUser = useCallback((userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser({ ...userData, token });
  }, []);

  // Clear user data from localStorage and state
  const clearUser = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setError(null);
  }, []);

  // Verify the JWT token with backend
  const verifyToken = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        clearUser();
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error("Token verification failed");
      }

      const data = await response.json();
      
      if (data.user) {
        persistUser(data.user, token);
        
        // If user is admin but on user frontend, redirect to admin
        if (data.user.isAdmin && window.location.href.includes(USER_FRONTEND_URL)) {
          window.location.href = ADMIN_FRONTEND_URL;
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Token verification error:", error);
      clearUser();
      return false;
    }
  }, [clearUser, persistUser, USER_FRONTEND_URL]);

  // Initialize authentication state
  useEffect(() => {
    const initializeAuth = async () => {
      const isAuthenticated = await verifyToken();
      
      // Handle case where admin might be logged in but on user frontend
      if (isAuthenticated && user?.isAdmin && window.location.href.includes(USER_FRONTEND_URL)) {
        window.location.href = ADMIN_FRONTEND_URL;
        return;
      }
      
      setAuthLoading(false);
    };
    
    initializeAuth();
  }, [verifyToken, user]);

  // Handle user login
  const login = async (credentials) => {
    try {
      setAuthLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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

      // Immediately redirect admin users to admin frontend
      if (data.user.isAdmin) {
        window.location.href = ADMIN_FRONTEND_URL;
        return; // Stop further execution
      }
      
      // Regular users continue to user dashboard
      navigate("/user-page");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle user registration
  const register = async (userData) => {
    try {
      setAuthLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
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
      
      // New registrations go to user dashboard (assuming they're not admins)
      navigate("/user-page");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle user logout
  const logout = useCallback(() => {
    clearUser();
    
    // If logging out from admin frontend, redirect to user frontend login
    if (window.location.href.includes(ADMIN_FRONTEND_URL)) {
      window.location.href = `${USER_FRONTEND_URL}/login`;
    } else {
      navigate("/login");
    }
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
        isAdmin: user?.isAdmin || false,
        setError,
        verifyToken
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