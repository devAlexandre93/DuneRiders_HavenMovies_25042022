// Imports
import React from 'react';
import axios from 'axios';

// Fonction qui gère l'affichage du composant Card qui contient les infos d'un film sur la page d'accueil
const Card = ({ movie, setIdForSimilarMovie, handleRecommendations }) => {

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

    // Fonction permettant d'ajouter un film préféré à la base de données
    const addFavoriteMovie = () => {
        axios({
            method: "post",
            url: "http://localhost:3001/movies/addMovie",
            data: { movieId: movie.id }
        })
    }

    // Fonction permettant d'ajouter un film préféré à la base de données
    const deleteFavoriteMovie = () => {
        axios({
            method: "delete",
            url: "http://localhost:3001/movies/removeMovie",
            data: { movieId: movie.id }
        }).then(window.location.reload());
    }

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
            <h4>
                {movie.vote_average.toFixed(1)}/10
                <span>⭐</span>
            </h4>
            <ul>{movie.genre_ids
                ? genreFinder()
                : movie.genres.map((genre, index) => (
                    <li key={index}>{genre.name}</li>
                ))}
                {typeof (setIdForSimilarMovie) == "undefined"
                    ? ""
                    : <li
                        className='btnSimilarMovies'
                        onClick={() => {
                            setIdForSimilarMovie(movie.id);
                            handleRecommendations()
                        }}
                    >
                        Films similaires
                    </li>}
            </ul>
            {movie.overview ? <h3> Synopsys </h3> : ""}
            <p>{movie.overview}</p>
            {movie.genre_ids ? (
                <div className="btn" onClick={() => addFavoriteMovie()}>
                    Ajouter à mes films
                </div>
            ) : (
                <div className="btn" onClick={() => deleteFavoriteMovie()}>
                    Retirer de mes films
                </div>
            )}
        </div>
    );
};

// Export
export default Card;