import React from "react";
import { useHomeFetch } from "../../hooks/useHomeFetch";
import { HomeContent, Title, CardGrid, Card } from "./home.style";
import { useNavigate } from "react-router-dom";
import slugify from "../../hooks/createSlug";

const Home = () => {
  const { state, loading, error, setIsLoadingMore } = useHomeFetch();
  const navigate = useNavigate(); // Hook para navegación

  if (error) return <div>Error al cargar los bares.</div>;
  if (loading && state.results.length === 0) return <div>Cargando...</div>;

  return (
    <HomeContent>
      <Title>Bares</Title>
      <CardGrid>
        {state.results.map((bar) => {
          const slug = slugify(bar.name); // Generar el slug
          return (
            <Card key={bar.barId}>
              <h3>{bar.name}</h3>
              <ul>
                {bar.menus.map((menu) => {
                  console.log(menu.id); // Verifica el id del menú
                  return (
                    <li
                      key={menu.id}
                      onClick={() => navigate(`/api/menu/${menu.id}`)}
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

export default Home;
