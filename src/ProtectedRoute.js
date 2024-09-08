import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from 'context/useAuth';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
