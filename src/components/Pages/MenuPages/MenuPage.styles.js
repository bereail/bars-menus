import styled from "styled-components";

// Wrapper principal para la página
export const MenuPageWrapper = styled.div`
  padding: 80px 20px; /* Espacio para que no quede tapado por el navbar */
  background-color: #f8f9fa;
  min-height: 100vh; /* Asegura que la página ocupe toda la altura de la ventana */
  box-sizing: border-box;
`;

// Estilo del título principal
export const MenuPageTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
`;

// Estilo del párrafo descriptivo
export const MenuPageDescription = styled.p`
  font-size: 1.2rem;
  color: #7f8c8d;
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
`;