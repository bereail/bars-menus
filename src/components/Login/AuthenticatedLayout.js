// src/Components/AuthenticatedLayout.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from '../Header';

const AuthenticatedLayout = () => {
    const { isLoggedIn } = useAuth();
  
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
  
    return (
      <div>
        <Navbar/>
        <main>
          <Outlet />
        </main>
      </div>
    );
  };
  

export default AuthenticatedLayout;
