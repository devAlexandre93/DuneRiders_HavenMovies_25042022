// Imports
import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';


// Fonction gérant l'affichage de la page d'accueil de l'app
const Home = () => {
    return (
        <div className='home-page'>
            <Header />
            <Form />
        </div>
    );
};

// Export
export default Home;