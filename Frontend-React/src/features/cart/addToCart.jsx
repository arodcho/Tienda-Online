import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export function useCart() {
  const { token } = useContext(AuthContext);

  const addToCart = async (productId) => {
    try {
      const res = await fetch(`http://localhost:8000/cartadd/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al agregar al carrito");
      const data = await res.json();
      console.log("Producto agregado:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return { addToCart };
}
