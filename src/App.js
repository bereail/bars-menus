import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import Navbar from "./components/Header";
import MenuPage from "./components/Pages/MenuPages";
import styled from "styled-components";
import HomePages from "./components/Pages/HomePages/HomePages";
import Footer from "./components/Footer";

// Contenedor principal para ajustar el espacio
const MainContent = styled.div`
  padding-top: 60px; /* Asegura que el contenido no quede tapado por el navbar */
  min-height: calc(100vh - 60px); /* Altura mínima de la pantalla menos la altura del navbar */
  display: flex;
  flex-direction: column; /* Asegura que el contenido se alinee verticalmente */
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
      <Footer />
      <GlobalStyle />
      
    </Router>
  );
}

export default App;
