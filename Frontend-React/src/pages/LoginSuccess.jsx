import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function LoginSuccess({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const userName = params.get("user");
    const userId = params.get("id");

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);

      setIsLoggedIn(true); // Actualiza estado en App
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [location, navigate, setIsLoggedIn]);

  return <div>Procesando login...</div>;
}

export default LoginSuccess;
