import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import store from './Store/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <CookiesProvider>
        <App />
    </CookiesProvider>
    </Provider>


);

