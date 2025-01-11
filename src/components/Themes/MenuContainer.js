// MenuPage.styles.js
import styled from "styled-components";

export const MenuContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.color};
  padding: 20px;
  min-height: 100vh;
  margin-top: 60px; /* Altura del Navbar */
`;
