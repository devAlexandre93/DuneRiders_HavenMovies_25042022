// Imports
import React from 'react';

// Fonction qui gère l'affichage du composant Card qui contient les infos d'un film sur la page d'accueil
const Card = ({ movie }) => {

    // Fonction permettant de formater les dates du film
    const dateFormater = (date) => {
        let [yy, mm, dd] = date.split("-");
        return [dd, mm, yy].join("/")
    };

    // Fonction permettant d'afficher les genres du film
    const genreFinder = () => {
        let genreArray = [];
        for (let i = 0; i < movie.genre_ids.length; i++) {
            switch (movie.genre_ids[i]) {
                case 28:
                    genreArray.push(`Action`);
                    break;
                case 12:
                    genreArray.push(`Aventure`);
                    break;
                case 16:
                    genreArray.push(`Animation`);
                    break;
                case 35:
                    genreArray.push(`Comédie`);
                    break;
                case 80:
                    genreArray.push(`Policier`);
                    break;
                case 99:
                    genreArray.push(`Documentaire`);
                    break;
                case 18:
                    genreArray.push(`Drame`);
                    break;
                case 10751:
                    genreArray.push(`Famille`);
                    break;
                case 14:
                    genreArray.push(`Fantasy`);
                    break;
                case 36:
                    genreArray.push(`Histoire`);
                    break;
                case 27:
                    genreArray.push(`Horreur`);
                    break;
                case 10402:
                    genreArray.push(`Musique`);
                    break;
                case 9648:
                    genreArray.push(`Mystère`);
                    break;
                case 10749:
                    genreArray.push(`Romance`);
                    break;
                case 878:
                    genreArray.push(`Science-fiction`);
                    break;
                case 10770:
                    genreArray.push(`Téléfilm`);
                    break;
                case 53:
                    genreArray.push(`Thriller`);
                    break;
                case 10752:
                    genreArray.push(`Guerre`);
                    break;
                case 37:
                    genreArray.push(`Western`);
                    break;
                default:
                    break;
            }
        }
        return genreArray.map((genre) => <li key={genre}>{genre}</li>);
    };

    // Fonction permettant d'ajouter un film au Local Storage
    const addStorage = () => {
        let storedData = window.localStorage.movies
            ? window.localStorage.movies.split(",")
            : []; // Récupération de ce qui a été stocké dans le Local Storage s'il y a quelque chose. Si vide, création d'un tableau

        if (!storedData.includes(movie.id.toString())) { // Vérification pour voir si l'Id du film n'est pas déjà dans le tableau
            storedData.push(movie.id); // Ajout de l'Id du film dans le tableau si celui-ci n'y est pas déjà
            window.localStorage.movies = storedData; // Incorporation de la donnée dans le Local Storage
        }
    };

    // Fonction permettant de retirer un film au Local Storage
    const deleteStorage = () => {
        let storedData = window.localStorage.movies.split(",");
        let newData = storedData.filter((id) => id != movie.id);
        window.localStorage.movies = newData;
        window.location.reload();
    };

    // Code HTML à injecter
    return (
        <div className="card">
            <img src={movie.poster_path ? "https://image.tmdb.org/t/p/w500" + movie.poster_path : "./img/generic_poster.jpg"} alt="Movie poster" />
            <h2> {movie.title} </h2>
            {movie.release_date ? (
                <h5> Sorti le : {dateFormater(movie.release_date)} </h5>
            ) : (
                ""
            )}
            <h4>{movie.vote_average}/10 <span>⭐</span></h4>
            <ul>{movie.genre_ids
                ? genreFinder()
                : movie.genres.map((genre, index) => (
                    <li key={index}>{genre.name}</li>
                ))}
            </ul>
            {movie.overview ? <h3> Synopsys </h3> : ""}
            <p>{movie.overview}</p>
            {movie.genre_ids ? (
                <div className="btn" onClick={() => addStorage()}>
                    Ajouter à mes films
                </div>
            ) : (
                <div className="btn" onClick={() => deleteStorage()}>
                    Supprimer de mes films
                </div>
            )}
        </div>
    );
};

// Export
export default Card;