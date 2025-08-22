import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Componente que maneja la redirección después de un login exitoso.
 * Extrae los parámetros de la URL (token, usuario, id) y los guarda en localStorage.
 * @param {Object} props - Props del componente.
 * @param {Function} props.setIsLoggedIn - Función para actualizar el estado de login en el componente padre.
 */
function LoginSuccess({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const userName = params.get("user");
    const userId = params.get("id");

    if (token) {
      // Guardar datos en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);

      setIsLoggedIn(true); // Actualiza estado en App
      navigate("/home");   // Redirige al home
    } else {
      navigate("/");       // Redirige al login si no hay token
    }
  }, [location, navigate, setIsLoggedIn]);

  return <div>Procesando login...</div>;
}

export default LoginSuccess;
