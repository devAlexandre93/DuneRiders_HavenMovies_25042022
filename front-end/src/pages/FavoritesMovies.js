// Imports
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

// Fonction qui gère l'affichage de la page des films préférés de l'utilisateur de l'app
const FavoritesMovies = () => {

    // Const contenant les Ids des films dans les favoris à afficher
    const [listData, setListData] = useState([]);

    //axios.get(
    //    `http://localhost:3001/movies/getFavoriteMovies`
    //).then((res) => setListMoviesId(res.data));
    //console.log(listMoviesId)

    // useEffect contenant deux requêtes pour récupérer les films préférés depuis le back-end (requête 1) puis les afficher (reqûete 2)
    useEffect(() => {
        axios.get(
            `http://localhost:3001/movies/getFavoriteMovies`
        ).then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                axios
                    .get(
                        `http://localhost:3001/movies/details?movieId=${res.data[i]}`
                    ).then((res) => setListData((listData) => [...listData, res.data.result]));
            }
        })
        //let moviesId = window.localStorage.movies ? window.localStorage.movies.split(",") : []; // Récupération de ce qui a été stocké dans le Local Storage s'il y a quelque chose. S'il n'y a rien cela retourne un tableau vide
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