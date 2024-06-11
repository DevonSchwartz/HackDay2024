import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Welcome from './welcome';
import reportWebVitals from './reportWebVitals';
import Login from './login';
import ItemBox from './components/ItemBox';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ItemBox />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();