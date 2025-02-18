import React from 'react';
import { isLoggedIn } from "../services/auth.header";
import { Outlet,Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  
  console.log('Status: '+isLoggedIn());

  return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoutes;