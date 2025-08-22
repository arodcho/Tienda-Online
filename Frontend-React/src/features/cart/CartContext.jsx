import { createContext, useState, useEffect, useContext } from "react";
import { getCart, addCart as addCartAPI, deleteCartItem as deleteCartItemAPI } from "../../services/api";
import { AuthContext } from "../auth/AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // estado de carga
  const [error, setError] = useState(null); // errores
  const [toast, setToast] = useState(""); // mensaje flotante

  useEffect(() => {
    if (token) {
      setLoading(true);
      getCart(token)
        .then((data) => setCart(data))
        .catch((err) => {
          console.error("Error cargando carrito:", err);
          setCart([]);
          setError("Error al cargar carrito");
        })
        .finally(() => setLoading(false));
    }
  }, [token]);

  const addCart = async (product) => {
    if (!token) return;
    try {
      const updatedItem = await addCartAPI(product.id, token);
      setCart((prev) => {
        const exists = prev.find((item) => item.id === updatedItem.id);
        if (exists) return prev.map((item) => item.id === updatedItem.id ? updatedItem : item);
        return [...prev, updatedItem];
      });
      // Mostrar toast
      setToast(`${product.name} agregado al carrito`);
      setTimeout(() => setToast(""), 2000);
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      setError("No se pudo agregar el producto");
    }
  };

  const removeCart = async (cartItemId) => {
    if (!token) return;
    try {
      await deleteCartItemAPI(cartItemId, token);
      setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    } catch (err) {
      console.error("Error al eliminar del carrito:", err);
      setError("No se pudo eliminar el producto");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart, loading, error, toast }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
