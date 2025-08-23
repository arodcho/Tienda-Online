import { useState, useEffect, useContext } from "react";
import { getProducts } from "../../services/api";
import { AuthContext } from "../auth/AuthContext";

/**
 * Hook para obtener la lista de productos desde la API.
 * @returns {Object} - Contiene los productos, estado de carga y posibles errores.
 * @property {Array} products - Lista de productos obtenidos.
 * @property {boolean} loading - Indica si la carga está en progreso.
 * @property {Error|null} error - Error ocurrido durante la carga, si existe.
 */
export default function useProducts() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    getProducts(token)
      .then((data) => setProducts(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [token]);

  return { products, loading, error };
}
