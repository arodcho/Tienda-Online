import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

function Home() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [token]);

  return (
    <div>
      <h1>Productos</h1>
      <div className="products-grid">
        {products.map(p => (
          <div key={p.id} className="product-card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
