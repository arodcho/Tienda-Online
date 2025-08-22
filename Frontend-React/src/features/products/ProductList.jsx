import { useState } from "react";
import useProducts from "./useProducts";
import { useCart } from "../cart/CartContext";

export default function ProductsList() {
  const { products, loading, error } = useProducts();
  const { addCart } = useCart();
  const [toast, setToast] = useState("");

  const handleAddCart = (productId, productName) => {
    addCart(productId);
    setToast(`${productName} agregado al carrito`);
    setTimeout(() => setToast(""), 2000);
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-700">Cargando productos...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error al cargar productos
      </p>
    );

  return (
    <div className="relative py-10 px-4">
      {/* Toast flotante */}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full shadow-lg animate-slide-in">
          {toast}
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1 flex flex-col"
          >
            {p.image ? (
              <div className="h-52 flex items-center justify-center bg-gray-50 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
                  onError={(e) => (e.target.src = "/img/fallback.png")}
                />
              </div>
            ) : (
              <div className="w-full h-52 bg-gray-200 flex items-center justify-center text-gray-500">
                Sin imagen
              </div>
            )}

            <div className="p-5 flex flex-col flex-grow">
              <h3 className="text-lg font-bold text-black mb-2">{p.name}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{p.description}</p>

              <div className="flex items-center mb-3 gap-2">
                {/* Precio de oferta */}
                <p className="text-red-600 font-bold text-lg">{p.price}€</p>

                {/* Precio original 25% más caro tachado */}
                <p className="text-gray-500 font-semibold text-lg line-through">
                  {Math.round(p.price * 1.25)}€
                </p>
              </div>

              <button
                onClick={() => handleAddCart(p.id, p.name)}
                className="mt-auto px-4 py-2 rounded-full font-semibold text-white shadow-lg
                           bg-gradient-to-r from-green-400 to-green-600
                           hover:from-green-500 hover:to-green-700
                           transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 flex justify-center items-center gap-2"
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
