// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./styles/index.scss"

// Injecte le code de mon fichier App.js dans le fichier index.html
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
