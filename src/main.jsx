import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

// старые ссылки вида /?page=chargeback
if (new URLSearchParams(window.location.search).get('page') === 'chargeback') {
  window.history.replaceState({}, '', '/chargeback');
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
