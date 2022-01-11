import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import '../node_modules/jquery/dist/jquery.min.js';
import './css/font-awesome/css/font-awesome.min.css'
import './css/header.css'
import './css/product-list.css'
import './css/sign-in.css'
import './css/dashboard.css'
import './css/interface.css'
import './css/woman-product.css'
import './css/detail-page.css'
import './css/faq.css'
import './css/coupon.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
