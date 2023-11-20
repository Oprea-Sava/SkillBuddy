
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const AuthRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signin" />;
};



export default AuthRoute;
