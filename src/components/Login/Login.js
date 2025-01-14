import React, { useState } from "react";
import { useAuth } from "../Login/AuthContext";
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
    setError("");
  
    const payload = { username, pass };
  
    try {
      const response = await fetch("https://localhost:7119/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Error del servidor:", errorMessage);
        setError(`Error: ${response.status} - ${errorMessage}`);
        return;
      }
  
      const data = await response.json();
      console.log("Autenticación exitosa:", data);
      login(data.Token); // Cambia 'Token' si el nombre es diferente en tu backend
      navigate("/allMenuRosita");
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
      setError("Error en la conexión con el servidor.");
    } finally {
      setLoading(false);
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