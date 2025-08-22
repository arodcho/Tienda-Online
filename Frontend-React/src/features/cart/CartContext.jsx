import { createContext, useState, useEffect, useContext } from "react";
import { getCart, addCart as addCartAPI} from "../../services/api";
import { AuthContext } from "../auth/AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  console.log("Token enviado:", token);

useEffect(() => {
  if (token) {
    getCart(token)
      .then(setCart)
      .catch((err) => {
        console.error("Error cargando carrito:", err);
        setCart([]); 
      });
  }
}, [token]);

  const addCart = async (productId) => {
    if (!token) return;
    const updatedItem = await addCartAPI(productId, token);
    setCart((prev) => {
      const exists = prev.find((item) => item.id === updatedItem.id);
      if (exists) return prev.map((item) => item.id === updatedItem.id ? updatedItem : item);
      return [...prev, updatedItem];
    });
  };


  return (
    <CartContext.Provider value={{ cart, addCart}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
