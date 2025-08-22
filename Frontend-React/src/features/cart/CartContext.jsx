import { createContext, useState, useEffect, useContext } from "react";
import {
  getCart,
  addCart as addCartAPI,
  deleteCartItem as deleteCartItemAPI,
} from "../../services/api";
import { AuthContext } from "../auth/AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // <-- nuevo estado loading

  const loadCart = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getCart(token);
      setCart(data);
    } catch (err) {
      console.error("Error cargando carrito:", err);
      setCart([]);
    } finally {
      setLoading(false); // <-- termina carga
    }
  };

  useEffect(() => {
    if (token) loadCart();
    else setLoading(false);
  }, [token]);

  const addCart = async (productId) => {
    if (!token) return;
    const updatedItem = await addCartAPI(productId, token);
    setCart((prev) => {
      const exists = prev.find((item) => item.id === updatedItem.id);
      if (exists) return prev.map((item) => (item.id === updatedItem.id ? updatedItem : item));
      return [...prev, updatedItem];
    });
  };

  const removeCart = async (cartItemId) => {
    if (!token) return;
    await deleteCartItemAPI(cartItemId, token);
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  return (
    <CartContext.Provider value={{ cart, addCart, removeCart, loadCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
