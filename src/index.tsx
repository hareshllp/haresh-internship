import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

import { isLoggedIn } from "./services/auth.header";

import './assets/css/index.css';
import './assets/css/style.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

import PrivateRoutes from './services/PrivateRoutes';


import HomePage from './Home';

import SignupComponent from './components/signup.component';
import LoginComponent from './components/login.component';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';

import Dashboard from './pages/dashboard.component';
import EditProfile from './pages/profile.edit.component';
import ChangePassword from './pages/changepassword.component';
import AdminSessions from './pages/sessions.component';

import Products from './pages/products';

import { store } from './redux/store';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


const rootElem = document.getElementById('root') as HTMLInputElement;
const root = ReactDOM.createRoot(rootElem);

let persistor = persistStore(store);

root.render(
    <React.Fragment>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignupComponent />} />
              <Route path="/login" element={ isLoggedIn() === true ? <Navigate to={"/dashboard"} /> : <LoginComponent />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword" element={<ResetPassword />} />

              <Route path="/" element={<PrivateRoutes />}>
                  <Route path="profile/edit" element={ <EditProfile />} />
                  <Route path="changePassword" element={ <ChangePassword />} />
                  <Route path="dashboard" element={ <Dashboard />} />
                  <Route path="sessions" element={ <AdminSessions />} />
                  <Route path="products" element={ <Products />} />
              </Route>   
            </Routes>
          </Router>
          </PersistGate>
      </Provider> 
  </React.Fragment>
);

// setInterval(function(){
  

// }, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
