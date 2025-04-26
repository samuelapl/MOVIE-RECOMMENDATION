import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const REACT_APP_API_URL = "https://movie-recommendation-backend-4780.onrender.com";
const REACT_APP_ADMIN_URL = "https://movie-recommendation-admin.onrender.com";

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
    setUser({ ...userData, token });
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
      
      if (data.user) {
        persistUser(data.user, token);
        
        // If admin is logged in but on user site, redirect to admin
        if (data.user.isAdmin && !window.location.href.includes(REACT_APP_ADMIN_URL)) {
          window.location.href = REACT_APP_ADMIN_URL;
          return false;
        }
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
        const errorText = await response.text();
        let errorMessage = "Login failed";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
          console.log(e)
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      persistUser(data.user, data.token);
      
      // Redirect admin to admin URL, regular users to user-page
      if (data.user.isAdmin) {
        window.location.href = REACT_APP_ADMIN_URL;
      } else {
        navigate("/user-page");
      }
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

      const responseText = await response.text();
      
      if (!response.ok) {
        let errorMessage = "Registration failed";
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = responseText || errorMessage;
          console.log(e)
        }
        throw new Error(errorMessage);
      }

      // Only try to parse if response is OK
      const data = JSON.parse(responseText);
      persistUser(data.user, data.token);
      
      // New registrations are assumed to be regular users
      navigate("/user-page");
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
    
    // If logging out from admin site, redirect to user login page
    if (window.location.href.includes(REACT_APP_ADMIN_URL)) {
      window.location.href = `${window.location.origin.replace('admin', 'user')}/login`;
    } else {
      navigate("/");
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