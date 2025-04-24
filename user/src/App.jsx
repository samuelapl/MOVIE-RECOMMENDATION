import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import WhatYouGetSection from './components/WhatYouGetSection';
import WhatYouGetSteps from './components/WhatYouGetSteps';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Layout from './components/Layout/Layout';


const App = () => {
  return (
    <Router>
 
      
      <Routes>
        {/* Main landing page route */}
        <Route path="/" element={
          <Layout>
            <LandingPage />
            <WhatYouGetSection />
            <WhatYouGetSteps />
          </Layout>
        } />
        
        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      
    </Router>
  );
};

export default App;