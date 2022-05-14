module.exports = (sequelize, Datatypes) => {

    const Users = sequelize.define("Users", {
        username: {
            type: Datatypes.STRING,
            allowNull: false
        }
    });

    return Users;
};