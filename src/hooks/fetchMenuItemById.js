import React, { useEffect, useState } from "react";
import API from "../API";
import { useParams } from "react-router-dom"; // Si quieres obtener el ID desde la URL

const FetchMenuItemById = () => {
  const { menuId } = useParams(); // Obtén el menuId desde la URL
  const [menuItem, setMenuItem] = useState(null); // Estado para almacenar los datos del menú
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    if (!menuId) return; // Si no hay un menuId, no se realiza la llamada
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const menu = await API.fetchMenuItem(menuId); // Llama a la función fetchMenuItem
        setMenuItem(menu); // Guarda los datos en el estado
      } catch (err) {
        setError(err.message); // Maneja errores
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };
    fetchMenu();
  }, [menuId]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!menuItem) return <div>No se encontró el menú</div>;

  return (
    <div>
      <h1>{menuItem.name}</h1>
     
    </div>
  );
};

export default FetchMenuItemById;
