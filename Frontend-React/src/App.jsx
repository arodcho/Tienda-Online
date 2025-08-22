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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
          <Routes>
            <Route
              path="/"
              element={isLoggedIn ? <Navigate to="/home" /> : <Login />}
            />
            <Route
              path="/cart"
              element={isLoggedIn ? <Cart /> : <Navigate to="/" />}
            />
            <Route
              path="/orders"
              element={isLoggedIn ? <Orders /> : <Navigate to="/" />}
            />
            <Route
              path="/login-success"
              element={<LoginSuccess setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/home"
              element={isLoggedIn ? <Home /> : <Navigate to="/" />}
            />
          </Routes>
        </OrdersProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
