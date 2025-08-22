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
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Productos
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover"
              />
            )}

            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">
                {p.name}
              </h3>
              <p className="text-gray-600 mb-4">{p.description}</p>

         
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
