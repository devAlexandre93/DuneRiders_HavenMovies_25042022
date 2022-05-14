// Import des modules npm - Ajout des plugins externes
const express = require('express');
const app = express();
const cors = require('cors');

// Création d'une application express  
app.use(express.json());

// Utilisation des modules (plugins externes) nécessaires au fonctionnement
app.use(cors());

// Déclaration nécessaire à l'utilisation de la base de données
const db = require('./models');

// Déclaration et utilisation des routes
const moviesRouter = require("./routes/movies");
app.use('/movies', moviesRouter);

// Lancement du serveur
db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});
