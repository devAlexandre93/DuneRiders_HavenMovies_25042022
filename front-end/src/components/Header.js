// Imports
import React from 'react';
import { NavLink } from 'react-router-dom';

// Fonction qui gère l'affichage du composant Header
const Header = () => {

    return (
        <div className="header">
            <nav>
                <ul>
                    <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}> <li> Accueil </li> </NavLink>
                    <NavLink to="/favorites-movies" className={(nav) => (nav.isActive ? "nav-active" : "")}> <li> Films préférés </li> </NavLink>
                </ul>
            </nav>
            <h1> Haven Movies </h1>
        </div>
    );
};

// Export
export default Header;