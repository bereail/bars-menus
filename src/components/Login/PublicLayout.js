// src/Components/PublicLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div>
      <main>
        <Outlet /> {/* Renderiza el contenido de las rutas públicas */}
      </main>
    </div>
  );
};

export default PublicLayout;
