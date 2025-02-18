import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';

import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
const Advance =  React.lazy(() => import('./Advance'));
const HomePage =  React.lazy(() => import('./Home'));
const LengthyForm =  React.lazy(() => import('./LengthyForm'));
const HooksDemo =  React.lazy(() => import('./HooksDemo'));


root.render(
  
  <React.StrictMode>
    <React.Fragment>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/advance" element={<Advance />} />
        <Route path="/form" element={<LengthyForm />} />
        <Route path="/hooks" element={<HooksDemo />} />
      </Routes>
    </Router>
  </React.Fragment>

  </React.StrictMode>
);

// setInterval(function(){
  

// }, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
