// src/Components/AuthenticatedLayout.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import RositaNavbar from '../Navbar/Index';

const AuthenticatedLayout = () => {
    const { isLoggedIn } = useAuth();
  
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
  
    return (
      <div>
        <RositaNavbar />
        <main>
          <Outlet />
        </main>
      </div>
    );
  };
  

export default AuthenticatedLayout;
