// Imports
import axios from 'axios';
import React, { useState } from 'react';
import Card from './Card';

// Fonction qui gère l'affichage du composant Form qui contient les fonctionnalités de recherche et de tri
const Form = () => {

    // Assignement des données récupérées depuis TMDB à des constantes
    const [moviesData, setMoviesData] = useState([]);
    // Assignement de la recherche utilisateur
    const [query, setQuery] = useState('');
    // Assignement pour retourner (top et flop) les films en fonction de leur note
    const [sortGoodBad, setSortGoodBad] = useState("goodToBad");
    // Assignement pour récupérer l'id du film dont il faut afficher les films similaires
    const [idForSimilarMovie, setIdForSimilarMovie] = useState('');

    if (query === '' && idForSimilarMovie === '') { // Check si query est idForSimilarMovie sont null pour afficher les films populaire à la première connexion
        // Requête pour aller chercher les films depuis le back-end si l'input de recherche est vide
        axios.get(
            `http://localhost:3001/movies`
        ).then((res) => setMoviesData(res.data.results));
    }

    // Fonction lançant la recherche au clic du bouton du formulaire
    const handleSearch = async (event) => {
        if (query != null) { // Check si query est rempli pour afficher les films correspondant à la recherche
            event.preventDefault();
            // Requête pour aller chercher les films depuis le back-end en fonction de l'input renseigné
            axios.get(
                `http://localhost:3001/movies/search?query=${query}`
            ).then((res) => setMoviesData(res.data.results));
            setSortGoodBad(null);
        }
    }

    // Fonction affichant les films similaires au clic du bouton "Films similaires" d'un film
    const handleRecommendations = async (movieId) => {
        // Requête pour aller chercher les films similaires depuis le back-end en fonction du film qui a été cliqué
        axios.get(
            `http://localhost:3001/movies/similarMovies?movieId=${movieId}`
        ).then((res) => setMoviesData(res.data.results));
        setSortGoodBad(null);
        setIdForSimilarMovie(movieId);
    }

    // Code HTML à injecter
    return (
        <div className="form-component">
            <div className="form-container">
                <form action='' onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder='Titre du film'
                        id='search-input'
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <input
                        type="submit"
                        value="Rechercher"
                    />
                </form>
                <div className="btn-sort-container">
                    <div
                        className="btn-sort"
                        id="goodToBad"
                        onClick={() => setSortGoodBad("goodToBad")}
                    >
                        Top
                        <span>➜</span>
                    </div>
                    <div
                        className="btn-sort"
                        id="badToGood"
                        onClick={() => setSortGoodBad("badToGood")}
                    >
                        Flop
                        <span>➜</span>
                    </div>
                </div>
            </div>
            <div className="result">
                {moviesData
                    .slice(0, 12)
                    .sort((a, b) => {
                        if (sortGoodBad === "goodToBad") {
                            return b.vote_average - a.vote_average
                        } else if (sortGoodBad === "badToGood") {
                            return a.vote_average - b.vote_average
                        } else {
                            return null
                        }
                    })
                    .map((movie) => (
                        <Card
                            key={movie.id}
                            movie={movie}
                            handleRecommendations={() => handleRecommendations(movie.id)}
                        />
                    ))}
            </div>
        </div>
    );
};

// Export
export default Form;