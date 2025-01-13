import React from "react";
import { useBarFetch } from "../../hooks/useBarFetch";
import { HomeContent, Title, CardGrid, Card } from "./home.style";
import { useNavigate } from "react-router-dom";
import slugify from "../../hooks/createSlug";
import { setSelectedMenuName } from "../../hooks/getSelectedMenuName"; // Usamos la función para almacenar el nombre del menú
import { setSelectedBarName } from "../../hooks/getSelectedBarName"; // Nueva función para almacenar el nombre del bar


//Componente que mapear los bares y al hacer click enviar el id  por path para redirecciones a MenuPage
//endpoint : //https://localhost:7119/Menu
//json a recibir : [{"id":1,"name":"Menu1","barId":2}

const Bar = () => {
  const { state, loading, error, setIsLoadingMore } = useBarFetch(); //https://localhost:7119/Menu
  const navigate = useNavigate();

  if (error) return <div>Error al cargar los bares.</div>;
  if (loading && state.results.length === 0) return <div>Cargando...</div>;

  return (
    //style
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
                      localStorage.setItem("selectedMenuId", menu.id); // Guardar el ID del menú seleccionado
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
