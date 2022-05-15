// Imports
const axios = require('axios').default;
const { FavoriteMovies } = require("../models");

// Fetch popular movies from TMDB api
const fetchPopularMovies = async () => {
    try {
        let result;
        await axios
            .get(
                `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
            )
            .then((response) => {
                result = response.data.results;
            })
            .catch((error) => {
                console.log(error);
            });
        return result;
    } catch (error) {
        console.error(error);
    }
};

// Get popular movies
exports.getPopularMovies = async (req, res, next) => {
    try {
        const results = await fetchPopularMovies();

        return res.status(200).json({
            status: 200,
            message: `${results.length} movies found`,
            results
        })
    } catch (err) {
        return next(err);
    }
};

// Fetch movies by search from TMDB api
const fetchMoviesBySearch = async (query) => {
    try {
        let result;
        await axios
            .get(
                `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.TMDB_API_KEY}&query=${query}&language=fr-FR`
            )
            .then((response) => {
                result = response.data.results;
            })
            .catch((error) => {
                console.log(error);
            });
        return result;
    } catch (error) {
        console.error(error);
    }
};

// Get movies by search
exports.getMoviesBySearch = async (req, res, next) => {
    try {
        const { query } = req.query;
        const results = await fetchMoviesBySearch(query);

        return res.status(200).json({
            status: 200,
            message: `${results.length} movies found`,
            results
        })
    } catch (err) {
        return next(err);
    }
};

// Fetch movie details from TMDB api
const fetchMovieDetails = async (movieId) => {
    try {
        let result;
        await axios
            .get(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&language=fr-FR`
            )
            .then((response) => {
                result = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
        return result;
    } catch (error) {
        console.error(error);
    }
};

// Get movie's details
exports.getMovieDetails = async (req, res, next) => {
    try {
        const { movieId } = req.query;
        const result = await fetchMovieDetails(movieId);

        return res.status(200).json({
            status: 200,
            message: `Movie found : ${result.original_title}`,
            result
        })
    } catch (err) {
        return next(err);
    }
};

// Add a movie to the favorites
exports.addMovieToFavorites = async (req, res, next) => {
    try {
        const { movieId } = req.body;
        await FavoriteMovies.create({
            tmdbId: movieId,
        });
        return res.status(200).json({
            status: 200,
            message: `Movie successfully added`,
        })
    } catch (err) {
        return next(err);
    }
};

// Remove a movie from the favorites
exports.removeMovieFromFavorites = async (req, res, next) => {
    try {
        const { movieId } = req.body;
        await FavoriteMovies.destroy({
            where: {
                tmdbId: movieId,
            },
        });
        return res.status(200).json({
            status: 200,
            message: `Movie successfully removed`,
        })
    } catch (err) {
        return next(err);
    }
};

// Remove a movie from the favorites
exports.removeMovieFromFavorites = async (req, res, next) => {
    try {
        const { movieId } = req.body;
        await FavoriteMovies.destroy({
            where: {
                tmdbId: movieId,
            },
        });
        return res.status(200).json({
            status: 200,
            message: `Movie successfully removed`,
        })
    } catch (err) {
        return next(err);
    }
};

// Get all the favorite movies
exports.getFavoriteMovies = async (req, res) => {
    const favoriteMovies = await FavoriteMovies.findAll();
    let arrayFavoriteMoviesId = new Array();
    for (let i = 0; i < favoriteMovies.length; i++) {
        arrayFavoriteMoviesId.push(favoriteMovies[i].tmdbId)
    }
    res.status(200).json(arrayFavoriteMoviesId);
};