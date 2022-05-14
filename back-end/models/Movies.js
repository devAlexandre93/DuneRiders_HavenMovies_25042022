module.exports = (sequelize, Datatypes) => {

    const Movies = sequelize.define("Movies", {
        title: {
            type: Datatypes.STRING,
            allowNull: false
        },
        tmdbId: {
            type: Datatypes.STRING,
            allowNull: false
        },
    });

    return Movies;
};