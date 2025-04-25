import React from 'react'
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
import LandingPage from '../LandingPage';
import WhatYouGetSection from '../WhatYouGetSection';
import WhatYouGetSteps from '../WhatYouGetSteps';
const Layout = () => {
  return (
    <>
      <Navbar />
      <LandingPage/>
      <WhatYouGetSection/>
      <WhatYouGetSteps/>
      <Footer />
    </>
  )
}

export default Layout
