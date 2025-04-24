import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AdminLayout from './pages/AdminLayout';
import Movies from './pages/Movies';
import Categories from './pages/Categories';
import SavedMovies from './pages/SavedMovies';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout/>}>
        <Route path="movies" element={<Movies/>}/>
        <Route path="saved-movies" element={<SavedMovies/>}/>
        <Route path="categories" element={<Categories />}/>
       </Route>
      </Routes>
    </Router>
  
  )
}

export default App
