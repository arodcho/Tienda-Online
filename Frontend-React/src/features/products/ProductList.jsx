import { useState } from "react";
import useProducts from "./useProducts";
import { useCart } from "../cart/CartContext";

export default function ProductsList() {
  const { products, loading, error } = useProducts();
  const { addCart } = useCart();
  const [toast, setToast] = useState("");

  const handleaddCart = (productId, productName) => {
    addCart(productId);
    setToast(`${productName} agregado al carrito`);

    setTimeout(() => setToast(""), 2000); // desaparece tras 2s
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  return (
    <div className="relative">
      {/* Toast flotante */}
      {toast && (
        <div className="fixed top-4 center-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
          {toast}
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            {p.image && (
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-semibold text-blue-600 mb-2">{p.name}</h3>
              <p className="text-gray-600 mb-4">{p.description}</p>
              <button
                onClick={() => handleaddCart(p.id, p.name)}
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
