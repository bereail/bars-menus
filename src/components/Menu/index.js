import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Menu = () => {
  const { slug } = useParams(); // Obtiene el slug o id de la URL
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    // Realiza una solicitud a la API con el slug o id
    const fetchMenu = async () => {
      try {
        const response = await fetch(`https://localhost:7119/api/Menu/${slug}`);
        const data = await response.json();
        setMenu(data);
      } catch (error) {
        console.error("Error al cargar el menú:", error);
      }
    };

    fetchMenu();
  }, [slug]);

  if (!menu) return <div>Cargando menú...</div>;

  return (
    <div>
      <h1>{menu.name}</h1>
      <p>Bar: {menu.bar.name}</p>
      <ul>
        {menu.products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
