import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Menu = () => {
  const { id } = useParams(); // Capturar el parámetro `id`
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`https://localhost:7119/api/Menu/${id}`);
        if (!response.ok) throw new Error("Error al cargar el menú.");
        const data = await response.json();
        setMenu(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  if (loading) return <div>Cargando menú...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{menu.name}</h1>
      <p>Bar: {menu.bar.name}</p>
      <p>Productos disponibles:</p>
      <ul>
        {menu.products.length > 0 ? (
          menu.products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default Menu;
