import { createContext, useContext, useState } from "react";
import { confirmCheckout, getCart } from "../../services/api";
import { useCart } from "../cart/CartContext";
import { AuthContext } from "../auth/AuthContext";

const CheckoutContext = createContext();

export const useCheckout = () => useContext(CheckoutContext);

export function CheckoutProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const { loadCart } = useCart(); 

  const checkout = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const result = await confirmCheckout(token);

      if (!result.ok) {
        setToast(`${result.message}`);
             await loadCart(); 

      } else {
   await loadCart(); 

        setToast(result.message || "Compra confirmada!");
        return result.order; 
      }
    } catch (err) {
      console.error("Error en la compra:", err);
      setToast("Error al realizar la compra");
    } finally {
      setTimeout(() => setToast(""), 2000);
      setLoading(false);
    }
  };

  return (
    <CheckoutContext.Provider value={{ checkout, loading, toast }}>
      {children}
    </CheckoutContext.Provider>
  );
}
