import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/auth/Login";
import LoginSuccess from "./pages/auth/LoginSuccess";
import Home from "./pages/Home";
import { AuthProvider } from "./features/auth/AuthContext";
import { CartProvider } from "./features/cart/CartContext";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/orders/Orders";
import { OrdersProvider } from "./features/orders/OrdersContext";

/**
 * Componente principal de la aplicación.
 * Define rutas y protege el acceso según el estado de autenticación.
 */
function App() {
  // Estado que indica si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // Inicializa el estado de login al cargar la app
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
          <Routes>
            {/* Ruta principal: redirige al home si ya está logueado */}
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
            />

            {/* Rutas protegidas */}
            <Route
              path="/cart"
              element={isLoggedIn ? <Cart /> : <Navigate to="/" />}
            />
            <Route
              path="/orders"
              element={isLoggedIn ? <Orders /> : <Navigate to="/" />}
            />
            <Route
              path="/home"
              element={isLoggedIn ? <Home /> : <Navigate to="/" />}
            />

            {/* Ruta de redirección después del login */}
            <Route
              path="/login-success"
              element={<LoginSuccess setIsLoggedIn={setIsLoggedIn} />}
            />
          </Routes>
        </OrdersProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
