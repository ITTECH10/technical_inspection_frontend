import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18n'
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import DataContextProvider from './contexts/DataContext'
import { BrowserRouter as Router } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

axios.defaults.withCredentials = true
// axios.defaults.baseURL = 'http://localhost:8000/api/v1'
axios.defaults.baseURL = 'https://technical-inspection.herokuapp.com/api/v1'

ReactDOM.render(
  // <React.StrictMode>
  <HelmetProvider>
    <Router>
      <DataContextProvider>
        <App />
      </DataContextProvider>,
    </Router>
  </HelmetProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
