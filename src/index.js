import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './Redux/store';
import { Provider } from 'react-redux'; // Importa Provider de React Redux


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

