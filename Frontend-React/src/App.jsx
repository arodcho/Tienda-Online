import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/auth/Login";
import LoginSuccess from "./pages/auth/LoginSuccess";
import Home from "./pages/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Para actualizar si el token cambia (por ejemplo, después de LoginSuccess)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login />} />
      <Route path="/login-success" element={<LoginSuccess setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;
