import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    Timer,
    LoginControl,
    DashboardCounts,
    UsersResult,
    EntryForm,
    CheckPassingGrade,
    TemperatureCalculator
    

} from './App';

import FilterableProductTable from './Products';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const timer = ReactDOM.createRoot(document.getElementById('timer'));




root.render(

  


  
  <React.StrictMode>
     <div className="products-search">
      <FilterableProductTable />
       
     </div>



    <div className="events-section">
      <h2 class="section-main-title">Events Demo</h2>
      <LoginControl>
      
        <div className="clock-section">
          <h2 class="section-main-title">Clock with Composition</h2>
          <Timer />
        </div>
      
      </LoginControl>
    </div>
    <div className="rendering-section">
      <h2 class="section-main-title">Conditional Rendering Demo</h2>
      <DashboardCounts />
    </div>
    <div className="list-key-section">
      <h2 class="section-main-title">List & Keys Demo</h2>
      <UsersResult />
    </div>

    <div className="form-section">
      <h2 class="section-main-title">Form Demo</h2>
      <EntryForm />
      <h2 class="section-main-title">Lifting State Up</h2>
      <div className='calculator-section'>
        <CheckPassingGrade />
        <TemperatureCalculator />
      </div>
    </div>
    
   


  </React.StrictMode>
);

// setInterval(function(){
  

// }, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
