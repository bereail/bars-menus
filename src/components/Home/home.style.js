import styled from "styled-components";

// Barra de navegación
export const HomeWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #2c3e50;
  padding: 10px 20px;
  color: #ecf0f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  box-sizing: border-box;
`;

// Título
export const Title = styled.h1`
  color: red;
  font-size: 2rem;
  margin-bottom: 20px;
`;

// Contenido principal
export const HomeContent = styled.div`
  margin-top: 70px;
  padding: 20px;
  font-size: 1.2rem;
  color: black;
  background-color: #f9f9f9;
`;

// Grid para las tarjetas
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Tres columnas */
  gap: 20px; /* Espaciado entre las tarjetas */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Dos columnas en pantallas pequeñas */
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr; /* Una columna en pantallas muy pequeñas */
  }
`;

// Estilo para cada tarjeta
export const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  h3 {
    margin-top: 0;
    font-size: 1.2rem;
    color: #333;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 10px 0;
  }

  li {
    font-size: 1rem;
    color: #666;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;