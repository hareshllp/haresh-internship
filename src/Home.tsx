import React from 'react';
import './assets/css/index.css';
import {
    Timer
    // LoginControl
    // DashboardCounts,
    // UsersResult,
    // EntryForm,
    // CheckPassingGrade,
    // TemperatureCalculator
} from './App';


export const CountButton = () => {

  setTimeout(()=>{
    console.log("timeout called");
  },0);
  const myPromise = new Promise((resolve) => {
      const result = "Hello, world!";
      console.log(result); // Output the value
      resolve(result); // Resolve the promise with the value
  });

  myPromise.then((value) => {
      console.log("Promise resolved with value:", value);
  });

  let a = 0;
  const incease = () => {
     a++;
     console.log(a);
     return true;
  }

  return (
    <button onClick={incease} >Click</button>
  )
}


export default class HomePage extends React.Component{

  render() {
    return (
      <>
      <div className="events-section">
          <div className="clock-section">
            <h2 className="section-main-title">Clock</h2>
            <Timer />
            <CountButton />
          </div>
      </div>
      </>  
    );
  }

}


// setInterval(function(){
  

// }, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

