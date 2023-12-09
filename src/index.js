import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import hotel from './assets/hotel.png';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div id='moto'>
      <img src={hotel} alt='motoboy' />
    </div>
    <App />
  </React.StrictMode>
);