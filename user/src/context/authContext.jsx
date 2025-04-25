// src/context/AuthContext.js
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true); 
  const navigate = useNavigate();
  // Inside AuthProvider component
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
      if (token) {
        try {
          setAuthLoading(true);
          const response = await fetch("/api/auth/verify", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Verified user data:", data.user); // Add this
            setUser(data.user);
          } else {
            console.log("Token verification failed"); // Add this
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.log("Token verification error:", error);
          localStorage.removeItem("token");
          console.log(error)
        }finally {
          setAuthLoading(false); // Set loading to false when done
        }
      }else {
        setAuthLoading(false); // No token to verify
      }
    };

    verifyToken();
  }, []);

  const login = async (userData) => {
    try {
      // Replace with your actual backend API call
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login response data:", data); 
      setUser({
        ...data.user, // user details
        token: data.token // make sure token is included
      });
      localStorage.setItem("token", data.token);
      navigate("/user-page");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout,authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
