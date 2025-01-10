import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { GlobalStyle } from "./GlobalStyle";
import Navbar from "./components/Header";
import Menu from "./components/Menu";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="api/menu/:slug" element={<Menu />} /> 
      </Routes>
      <GlobalStyle />
    </Router>
  );
}

export default App;
