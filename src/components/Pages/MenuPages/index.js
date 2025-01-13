// MenuPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { MenuContainer} from "../../Themes/MenuContainer";
import { themes } from "../../Themes/themes";
import API from "../../../API";
import Button from "../../Button";


//funcion para mapear los items de su menu
// endpoint -> /https://localhost:7119/Menu/{menuId}/details
/* json a recibir ->  	
Response body
Download
{
  "menuId": 2,
  "menuName": "Menu2",
  "products": [
    {
      "productId": 5,
      "productName": "Ipa",
      "productPrice": 1,
      "productDescription": "ipa",
      "category": {
        "categoryId": 1,
        "categoryName": "Cerveza",
        "section": {
          "sectionId": 2,
          "sectionName": "Bebida"
        }
      }
    },*/

const MenuPage = () => {
  const { menuName } = useParams();
  const theme = themes[menuName] || themes.default;
  const [menuDetails, setMenuDetails] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null); // Estado para rastrear la sección seleccionada
  const menuId = localStorage.getItem("selectedMenuId"); // Recuperar el ID del menú seleccionado

  useEffect(() => {
    document.title = menuName;


    const fetchMenuDetails = async () => {
      try {
        if (!menuId) {
          throw new Error("No menu ID found");
        }

        // Usar API.fetchMenuItem para obtener los detalles
       ///https://localhost:7119/Menu/{menuId}/details -> endpoint
        const data = await API.fetchMenuItem(menuId);
        setMenuDetails(data);
      } catch (error) {
        console.error("Error fetching menu details:", error);
      }
    };

    fetchMenuDetails();
  }, [menuName, menuId]);

  if (!menuDetails) return <div>Cargando...</div>;

// Filtrar productos según la sección seleccionada
const filteredProducts = selectedSection
? menuDetails.products.filter(
    (product) => product.category.section.sectionId === selectedSection
  )
: [];

// Agrupar productos por categoría
const groupedProducts = filteredProducts.reduce((acc, product) => {
const categoryName = product.category.categoryName;
if (!acc[categoryName]) {
  acc[categoryName] = [];
}
acc[categoryName].push(product);
return acc;
}, {});

return (
<ThemeProvider theme={theme}>
  <MenuContainer>
    <h1>{menuDetails.menuName}</h1>

    {/* Botones para seleccionar la sección */}
    {!selectedSection && (
      <div>
        <button onClick={() => setSelectedSection(2)}>Para Tomar</button>
        <button onClick={() => setSelectedSection(3)}>Para Comer</button>
      </div>
    )}
 {/* Mostrar productos según la sección seleccionada */}
 {selectedSection && (
          <div>
            <Button
              onClick={() => setSelectedSection(null)}
              label="Volver"
            />
            {Object.keys(groupedProducts).length > 0 ? (
              Object.keys(groupedProducts).map((categoryName) => (
                <div key={categoryName}>
                  <h2>{categoryName}</h2>
                  <ul>
                    {groupedProducts[categoryName].map((product) => (
                      <li key={product.productId}>
                        <strong>{product.productName}</strong> - $
                        {product.productPrice}
                        <p>{product.productDescription}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p>No hay productos disponibles en esta sección.</p>
            )}
          </div>
        )}
      </MenuContainer>
    </ThemeProvider>
  );
};

export default MenuPage;