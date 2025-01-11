import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import Navbar from "./components/Header";
import MenuPage from "./components/Pages/MenuPages";
import styled from "styled-components";
import HomePages from "./components/Pages/HomePages/HomePages";

// Contenedor principal para ajustar el espacio
const MainContent = styled.div`
  padding-top: 60px; /* Asegura que el contenido no quede tapado por el navbar */
`;

function App() {
  return (
    <Router>
      <Navbar />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePages />} />
          <Route path="/:menuName" element={<MenuPage />} />
        </Routes>
      </MainContent>
      <GlobalStyle />
    </Router>
  );
}

export default App;
