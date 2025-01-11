// MenuPage.js
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MenuContainer} from "../../Themes/MenuContainer";
import { themes } from "../../Themes/themes";

const MenuPage = () => {
  const { menuName } = useParams();
  const theme = themes[menuName] || themes.default;

  useEffect(() => {
    document.title = menuName;
  }, [menuName]);

  return (
    <ThemeProvider theme={theme}>
      <MenuContainer>
        <h1>{menuName}</h1>
        <p>Esta es la página para el menú: {menuName}</p>
      </MenuContainer>
    </ThemeProvider>
  );
};

export default MenuPage;
