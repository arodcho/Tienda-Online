import { createContext, useContext, useState, useEffect } from "react";
import { confirmCheckout, getOrders } from "../../services/api";
import { useCart } from "../cart/CartContext";
import { AuthContext } from "../auth/AuthContext";

const OrdersContext = createContext();

export const useOrders = () => useContext(OrdersContext);

export function OrdersProvider({ children }) {
  const { token } = useContext(AuthContext);
  const { loadCart } = useCart(); // recargar carrito al finalizar compra

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState(null);

  // Cargar historial de órdenes
  const loadOrders = async () => {
    if (!token) return;
    setLoadingOrders(true);
    try {
      const data = await getOrders(token);
      setOrders(data);
    } catch (err) {
      console.error("Error cargando historial:", err);
      setError("No se pudo cargar el historial");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (token) loadOrders();
  }, [token]);

  // Realizar checkout
  const checkout = async () => {
    if (!token) return;

    setLoadingCheckout(true);
    try {
      const result = await confirmCheckout(token);

      if (!result.ok) {
        setToast(result.message || "Error al confirmar la compra");
        await loadCart(); // recargar carrito vacío
        await loadOrders(); // actualizar historial
      } else {
        await loadCart(); // recargar carrito vacío
        await loadOrders(); // actualizar historial
        setToast(result.message || "Compra confirmada!");
        return result.order;
      }
    } catch (err) {
      console.error("Error en la compra:", err);
      setToast("Error al realizar la compra");
    } finally {
      setTimeout(() => setToast(""), 2000);
      setLoadingCheckout(false);
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        loadingOrders,
        loadingCheckout,
        checkout,
        toast,
        error,
        loadOrders,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}
