// Imports
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

// Fonction qui gère l'affichage de la page des films préférés de l'utilisateur de l'app
const FavoritesMovies = () => {

    // Const permettant de savoir si un film est dans les favoris ou non
    const [listData, setListData] = useState([]);

    // useEffect contenant une requête pour aller chercher les films depuis TMDB qui sont dans la liste des films préférés de l'utilisateur
    useEffect(() => {
        let moviesId = window.localStorage.movies ? window.localStorage.movies.split(",") : []; // Récupération de ce qui a été stocké dans le Local Storage s'il y a quelque chose. S'il n'y a rien cela retourne un tableau vide

        for (let i = 0; i < moviesId.length; i++) {
            axios
                .get(
                    `http://localhost:3001/movies/details?movieId=${moviesId[i]}`
                ).then((res) => setListData((listData) => [...listData, res.data.result]));
        }
    }, []);


    // Code HTML à injecter
    return (
        <div className='user-list-page'>
            <Header />
            <h2> Films préférés <span>💖</span> </h2>
            <div className="result">
                {listData.length > 0
                    ? listData.map((movie) => <Card movie={movie} key={movie.id} />)
                    : <h2> Aucun film préféré pour le moment </h2>
                }
            </div>
        </div>
    );
};

// Export
export default FavoritesMovies;