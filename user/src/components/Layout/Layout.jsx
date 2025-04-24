import React from 'react'
import Navbar from '../Layout/Navbar';
import Footer from '../Layout/Footer';
const Layout = ({children}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default Layout
