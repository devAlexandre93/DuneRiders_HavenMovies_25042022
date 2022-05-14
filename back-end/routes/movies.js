// Imports
const express = require('express'); // Ajout de plugin externe nécessaire pour utiliser le router d'Express
const router = express.Router(); // Appel du router avec la méthode mise à disposition par Express

// Ajout du controller
const moviesCtrl = require('../controller/movies');

// Ajout des routes "movies"
router.get('/', moviesCtrl.getPopularMovies);
router.get('/search', moviesCtrl.getMoviesBySearch);

// Export
module.exports = router