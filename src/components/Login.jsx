/**
 * ==============================================
 * Componente del formulario de inicio de sesión
 * ==============================================
 */

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import "@/css/components/Form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // Envío del formulario de login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Intentamos iniciar sesión
      await login(email, password);
    } catch (err) {
      // Captura errores y muestra mensaje al usuario
      setError(
        err.message || "Error al iniciar sesión. Verifica tus credenciales."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      {/* Mensaje de error si existe */}
      {error && <p className="error-message">{error}</p>}
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="form">
        {/* Campo de email */}
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
            autoComplete="email"
          />
        </div>
        {/* Campo de contraseña */}
        <div className="form-group">
          <label htmlFor="login-password">Contraseña</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required // Validación HTML5 - campo obligatorio
            className="form-input"
            autoComplete="current-password" // Sugiere contraseñas guardadas
          />
        </div>
        {/* Botón de envío */}
        <button type="submit" disabled={loading} className="button">
          {/* Estado de carga */}
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
