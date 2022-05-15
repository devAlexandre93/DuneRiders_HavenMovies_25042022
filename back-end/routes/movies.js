// Imports
const express = require('express'); // Ajout de plugin externe nécessaire pour utiliser le router d'Express
const router = express.Router(); // Appel du router avec la méthode mise à disposition par Express

// Ajout du controller
const moviesCtrl = require('../controller/movies');

// Ajout des routes "movies"
router.get('/', moviesCtrl.getPopularMovies);
router.get('/search', moviesCtrl.getMoviesBySearch);
router.get('/details', moviesCtrl.getMovieDetails);
router.post('/addMovie', moviesCtrl.addMovieToFavorites);
router.delete('/removeMovie', moviesCtrl.removeMovieFromFavorites);
router.get('/favoriteMovies', moviesCtrl.getFavoriteMovies);
router.get('/similarMovies', moviesCtrl.getSimilarMovies);


// Export
module.exports = router