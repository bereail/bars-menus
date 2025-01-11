import React from "react";
import { useMenuFetch } from "../../hooks/useMenuFetch";
import { Link } from "react-router-dom";

const MenuList = () => {
  const { state, loading, error } = useMenuFetch();

  if (loading) return <div>Cargando menús...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Menús Disponibles</h1>
      <ul>
        {state.results.map((menu) => (
          <li key={`${menu.id}-${menu.name}`}>
            <Link to={`/menuPages/${menu.id}`}>{menu.name}</Link> {/* Link actualizado */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
