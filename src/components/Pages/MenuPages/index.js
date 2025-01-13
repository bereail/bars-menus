// MenuPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MenuContainer} from "../../Themes/MenuContainer";
import { themes } from "../../Themes/themes";

const MenuPage = () => {
  const { menuName } = useParams();
  const theme = themes[menuName] || themes.default;
  const [menuDetails, setMenuDetails] = useState(null);
  const menuId = localStorage.getItem("selectedMenuId"); // Recuperar el ID del menú seleccionado

  useEffect(() => {
    document.title = menuName;

    const fetchMenuDetails = async () => {
      try {
        if (!menuId) {
          throw new Error("No menu ID found");
        }

        const response = await fetch(`https://localhost:7119/Menu/${menuId}/details`);
        if (!response.ok) {
          throw new Error("Error fetching menu details");
        }

        const data = await response.json();
        setMenuDetails(data);
      } catch (error) {
        console.error("Error fetching menu details:", error);
      }
    };

    fetchMenuDetails();
  }, [menuName, menuId]);

  if (!menuDetails) return <div>Cargando...</div>;

  return (
    <ThemeProvider theme={theme}>
      <MenuContainer>
        <h1>{menuDetails.menuName}</h1>
        <ul>
          {menuDetails.products.map((product) => (
            <li key={product.productId}>
              {product.productName} - ${product.productPrice}
            </li>
          ))}
        </ul>
      </MenuContainer>
    </ThemeProvider>
  );
};

export default MenuPage;
