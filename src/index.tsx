import React from 'react';
import ReactDOM from 'react-dom'; // Fix import statement
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = document.getElementById('root');
ReactDOM.render( // Fix render method
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
  root // Fix root element placement
);

reportWebVitals(); // Remove unnecessary console.log
