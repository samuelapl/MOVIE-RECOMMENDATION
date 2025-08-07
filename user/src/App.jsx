import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./auth-page/LoginPage.jsx";
import SignupPage from "./auth-page/SignupPage.jsx";
import UserDashboard from "./components/UserPage/UserDashboard";
import FavoritesPage from "./components/UserPage/FavoritesPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import WithSidebarLayout from "./components/Layout/WithSidebarLayout.jsx";
import Trending from "./components/UserPage/Tranding.jsx";
import NewReleases from  "./components/UserPage/NewReleases.jsx";
import FoyFou from "./components/UserPage/ForYouPage.jsx"
import LandingPage from "./landing-page/LandingPage.jsx"
const App = () => {
  return (
    <Router>
      <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage/>} />
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

             <Route
              path="/for-you"
              element={
                <ProtectedRoute>
                  <WithSidebarLayout>
                    <FoyFou />
                  </WithSidebarLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
