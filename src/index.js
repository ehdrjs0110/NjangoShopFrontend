import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import '../src/styles/index.css';
import { CookiesProvider } from 'react-cookie';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CookiesProvider>
        <App />
    </CookiesProvider>

);

