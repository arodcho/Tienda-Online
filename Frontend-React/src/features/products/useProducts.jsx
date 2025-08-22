import { useState, useEffect, useContext } from "react";
import { getProducts } from "../../services/api";
import { AuthContext } from "../auth/AuthContext";

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
