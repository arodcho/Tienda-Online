import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useCart } from "../features/addToCart";

function Home() {
  const { addToCart } = useCart();
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [token]);

  const handleAddToCart = async (productId) => {
    await addToCart(productId); // Llama al hook del carrito
    setMessage("Producto agregado al carrito");

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Productos
      </h1>

  {message && (
  <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow transition-opacity duration-300">
    {message}
  </div>
)}

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            {p.image && (
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">{p.name}</h3>
              <p className="text-gray-600 mb-4">{p.description}</p>
              <button
                onClick={() => handleAddToCart(p.id)}
                className="mt-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
