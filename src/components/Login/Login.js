import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Limpiamos cualquier error previo

    try {
      const response = await fetch("https://localhost:7119/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: username, Password: pass }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Errores del servidor:", errorData);
        throw new Error(errorData.title || "Error de autenticación");
      }

      const data = await response.json();
      console.log("Autenticación exitosa:", data);

      // Lógica adicional, como guardar el token
      login(data.Token);
      setUsername(""); // Limpiamos los campos
      setPass(""); // Limpiamos los campos
      navigate("/allMenuRosita"); // Redirect after successful login
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      setError(error.message);
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            id="pass"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </form>
    </div>
  );
};

export default Login;