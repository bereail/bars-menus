import React from "react";
import { useBarFetch } from "../../hooks/useBarFetch";
import { HomeContent, Title, CardGrid, Card } from "./home.style";
import { useNavigate } from "react-router-dom";
import slugify from "../../hooks/createSlug";
import { setSelectedMenuName } from "../../hooks/getSelectedMenuName"; // Usamos la función para almacenar el nombre del menú
import { setSelectedBarName } from "../../hooks/getSelectedBarName"; // Nueva función para almacenar el nombre del bar
import FetchMenuItemById from "../../hooks/fetchMenuItemById";

const Bar = () => {
  const { state, loading, error, setIsLoadingMore } = useBarFetch();
  const navigate = useNavigate();

  if (error) return <div>Error al cargar los bares.</div>;
  if (loading && state.results.length === 0) return <div>Cargando...</div>;

  return (
    <HomeContent>
      <Title>Bares</Title>

      <CardGrid>
        {state.results.map((bar) => {
           console.log("Bar:", bar);
          return (
            <Card key={bar.barId}>
              <h3>{bar.name}</h3>
              <ul>
                {bar.menus.map((menu) => {
                   const slug = slugify(menu.name);
                  return (
                    <li
                    key={menu.id}
                    onClick={() => {
                      const slug = slugify(menu.name); // Convertir el nombre del menú en un slug
                      setSelectedBarName(bar.name); // Guardar el nombre del bar seleccionado (opcional)
                      setSelectedMenuName(menu.name); // Guardar el nombre del menú seleccionado
                      navigate(`/${slug}`); // Redirigir a la página dinámica
                    }}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {menu.name}
                  </li>
                  
                  );
                })}
              </ul>
            </Card>
          );
        })}
      </CardGrid>

      {state.page < state.total_pages && !loading && (
        <button onClick={() => setIsLoadingMore(true)}>Cargar más</button>
      )}
    </HomeContent>
  );
};

export default Bar;
