// Imports
import axios from 'axios';
import React, { useState } from 'react';
import Card from './Card';

// Fonction qui gère l'affichage du composant Form qui contient les fonctionnalités de recherche et de tri
const Form = () => {

    // Assignement des données récupérées depuis TMDB à des constantes
    const [moviesData, setMoviesData] = useState([]);
    // Assignement de la recherche utilisateur
    const [search, setSearch] = useState('');
    // Assignement pour retourner (top et flop) les films en fonction de leur note
    const [sortGoodBad, setSortGoodBad] = useState(null);

    if (search === '') { // Check si search est null pour afficher les films populaire
        // Requête pour aller chercher les films depuis TMDB en fonction de l'input de recherche est vide
        axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
        ).then((res) => setMoviesData(res.data.results));

    }

    // Fonction lançant la recherche au clic du bouton du formulaire
    const handleSearch = async (event) => {
        if (search != null) { // Check si search est rempli pour afficher les films correspondant à la recherche
            event.preventDefault();
            // Requête pour aller chercher les films depuis TMDB en fonction de l'input renseigné
            axios.get(
                `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${search}&language=fr-FR`
            ).then((res) => setMoviesData(res.data.results));
            setSortGoodBad(null);
        }
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
                        onChange={(event) => setSearch(event.target.value)}
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
                        <Card key={movie.id} movie={movie} />
                    ))}
            </div>
        </div>
    );
};

// Export
export default Form;