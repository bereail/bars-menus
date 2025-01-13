// Button.js
import styled from "styled-components";

// Crear un componente de botón estilizado
 export const StyledButton = styled.button`
  background-color: ${({ bgColor }) => bgColor || "#007bff"}; /* Color de fondo */
  color: ${({ color }) => color || "white"}; /* Color del texto */
  font-size: ${({ fontSize }) => fontSize || "16px"}; /* Tamaño de fuente */
  padding: ${({ padding }) => padding || "10px 20px"}; /* Espaciado */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#0056b3"}; /* Color al pasar el mouse */
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
