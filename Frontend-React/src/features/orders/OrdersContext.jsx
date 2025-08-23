import { createContext, useContext, useState, useEffect } from "react";
import { confirmCheckout, getOrders } from "../../services/api";
import { useCart } from "../cart/CartContext";
import { AuthContext } from "../auth/AuthContext";

const OrdersContext = createContext();

export const useOrders = () => useContext(OrdersContext);

export function OrdersProvider({ children }) {
  const { token } = useContext(AuthContext);
  const { loadCart } = useCart();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true); // loader global al inicio
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState(null);

  const loadOrders = async () => {
    if (!token) {
      setLoadingOrders(false); // si no hay token, marcar como cargado
      return;
    }
    setLoadingOrders(true);
    try {
      const data = await getOrders(token);
      setOrders(data);
      setError(null);
    } catch (err) {
      console.error("Error cargando historial:", err);
      setError("No se pudo cargar el historial");
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [token]);

  const checkout = async () => {
    if (!token) return;

    setLoadingCheckout(true);
    try {
      const result = await confirmCheckout(token);
      await loadCart();
      await loadOrders();

      if (result.ok) {
        setToast(result.message || "Compra confirmada!");
        return result.order;
      } else {
        setToast(result.message || "Error al confirmar la compra");
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
