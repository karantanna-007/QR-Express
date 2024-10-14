// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AuthApp from './AuthApp'; // Update to import AuthApp
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthApp />
  </React.StrictMode>,
  document.getElementById('root')
);
