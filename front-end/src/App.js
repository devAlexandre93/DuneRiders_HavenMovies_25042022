// Imports
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home"
import FavoritesMovies from "./pages/FavoritesMovies"

// Fontion qui gère la navigation de l'app grâce aux routes 
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites-movies" element={<FavoritesMovies />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

// Export
export default App;