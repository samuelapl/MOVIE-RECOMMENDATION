import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AdminDashboard from './pages/AdminDashboard';
import Movies from './pages/Movies';
import Categories from './pages/Categories';
import Users from './pages/Users';
import Settings from './pages/Settings';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="movies" element={<Movies/>}/>
        <Route path="categories" element={<Categories />}/>
        <Route path="users" element={<Users/>}/>
        <Route path="settings" element={<Settings />}/>
      </Routes>
    </Router>
  
  )
}

export default App
