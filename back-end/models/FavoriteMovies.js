module.exports = (sequelize, Datatypes) => {

    const FavoriteMovies = sequelize.define("FavoriteMovies", {
        tmdbId: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    return FavoriteMovies;
};