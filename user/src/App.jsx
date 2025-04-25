import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import WhatYouGetSection from "./components/WhatYouGetSection";
import WhatYouGetSteps from "./components/WhatYouGetSteps";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Layout from "./components/Layout/Layout";
import UserDashboard from "./components/UserPage/UserDashboard";
import FavoritesPage from "./components/UserPage/FavoritesPage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from "./context/authContext.jsx";
import WithSidebarLayout from "./components/Layout/WithSidebarLayout.jsx";

// App.js
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected routes */}
            {/* <Route element={<ProtectedRoute />}>
              <Route 
                path="/user-page" 
                element={
                  <WithSidebarLayout>
                    <UserDashboard />
                  </WithSidebarLayout>
                } 
              />
              <Route 
                path="/favorites" 
                element={
                  <WithSidebarLayout>
                    <FavoritesPage />
                  </WithSidebarLayout>
                } 
              />
            </Route> */}

            <Route path="/user-page" element={
  <ProtectedRoute>
    <WithSidebarLayout>
      <UserDashboard />
    </WithSidebarLayout>
  </ProtectedRoute>
} />
            <Route path="/favorites" element={
  <ProtectedRoute>
    <WithSidebarLayout>
      <FavoritesPage />
    </WithSidebarLayout>
  </ProtectedRoute>
} />



          </Routes>
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;