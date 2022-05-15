# Haven Movies #

Ceci est un projet réalisé par une équipe de 3 personnes dans le cadre du Bachelor "Concepteur Développeur d'Applications" de l'EPSI

## Prérequis ##

- NodeJS
- MySQL

## Étapes pour faire fonctionner l'application depuis son ordinateur ##

### Initialisation du back-end ###

- Cloner ce repository
- Lancer le terminal depuis le dossier `back-end` et exécuter `npm install` pour installer les dépendances du projet 
- Dans le dossier `config` du dossier `back-end`, modifier la partie "development" du fichier `config.json` comme indiqué :
"development": {
    "username": "Votre nom d'utilisateur MySQL",
    "password": "Votre mot de passe MySQL",
    "database": "Le nom de la base de données créée au préalable via MySQL",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
- Dans le dossier `config` du dossier `back-end`, créer un fichier `.env` remplissez le comme indiqué :
TMDB_API_KEY="Votre API key TMDB"
- Depuis le dossier `back-end`, exécuter la commande `npm start` pour lancer le serveur, si tout fonctionne correctement le message `Server running on port 3001` apparaitra

### Initialisation du front-end ###

- Lancer un nouveau terminal depuis le dossier `front-end` et exécuter `npm install` pour installer les dépendances du projet
- Depuis le dossier `front-end`, exécuter la commande `npm start`, si tout fonctionne correctement l'application s'ouvrira automatiquement dans votre navigateur par défaut à l'adresse `http://localhost:3000/`

### Ce qu'il est possible de faire sur l'application ###

- Rechercher un film avec son titre
- Classer la recherche de film en fonction des notes
- Ajouter et retirer ses films préférés
