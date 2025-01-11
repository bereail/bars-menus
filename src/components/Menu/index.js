import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Menu = () => {
  const { id } = useParams();  // Get the menu ID from the URL
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`/api/menu/${id}`);  // API call to the backend
        if (!response.ok) throw new Error("Error loading menu data.");
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {menu && (
        <>
          <h1>{menu.name}</h1>  {/* Display the menu name */}
          {/* Render other details of the menu */}
        </>
      )}
    </div>
  );
};

export default Menu;
