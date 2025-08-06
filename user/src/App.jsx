import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Layout from "./components/Layout/Layout";
import UserDashboard from "./components/UserPage/UserDashboard";
import FavoritesPage from "./components/UserPage/FavoritesPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/authContext.jsx";
import WithSidebarLayout from "./components/Layout/WithSidebarLayout.jsx";
import Trending from "./components/UserPage/Tranding.jsx";
import NewReleases from  "./components/UserPage/NewReleases.jsx";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout></Layout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route
              path="/user-page"
              element={
                <ProtectedRoute>
                  <WithSidebarLayout>
                    <UserDashboard />
                  </WithSidebarLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <WithSidebarLayout>
                    <FavoritesPage />
                  </WithSidebarLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/trending"
              element={
                <ProtectedRoute>
                  <WithSidebarLayout>
                    <Trending />
                  </WithSidebarLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-releases"
              element={
                <ProtectedRoute>
                  <WithSidebarLayout>
                    <NewReleases />
                  </WithSidebarLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
