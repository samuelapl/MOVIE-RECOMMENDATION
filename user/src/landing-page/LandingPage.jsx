import React from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import WhatYouGet from './components/WhatYouGet';
import Steps from './components/Steps';
const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero/>
      <WhatYouGet/>
      <Steps/>
      <Footer />
    </>
  )
}

export default LandingPage
