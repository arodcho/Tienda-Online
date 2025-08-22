import Navbar from "../../components/Navbar";
import { useCart } from "../../features/cart/CartContext";
import { useOrders } from "../../features/orders/OrdersContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeCart, loading: cartLoading } = useCart();
  const { checkout, loading: checkoutLoading, toast } = useOrders();
  const navigate = useNavigate();

  // Total con descuento (precio real)
  const totalPrice = cart.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0
  );

  // Total original (sin descuento)
  const totalOriginal = cart.reduce(
    (total, item) => total + Math.round((item.product?.price || 0) * item.quantity * 1.25),
    0
  );

  const totalDiscount = totalOriginal - totalPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />

      <div className="container mx-auto px-6 py-10">
        {toast && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-fadeIn">
            {toast}
          </div>
        )}

        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
          Carrito
        </h1>

        {cartLoading ? (
          <div className="w-full bg-gray-200 rounded-full h-4 mb-8 overflow-hidden">
            <div className="bg-blue-600 h-4 animate-pulse w-3/4"></div>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-gray-500 text-lg text-center">
              Explora nuestros productos y añade tus favoritos.
            </p>
            <button
              onClick={() => navigate("/home")}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:bg-blue-700 transition-all duration-300"
            >
              Ir a la tienda
            </button>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl shadow hover:shadow-xl transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product?.image || "/img/default-product.webp"}
                      alt={item.product?.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h2 className="font-semibold text-lg text-gray-900">
                        {item.product?.name || "Producto desconocido"}
                      </h2>
                      <div className="flex items-center gap-2 mt-1 mb-2">
                        <p className="text-red-600 font-bold text-lg">
                          {(item.product?.price * item.quantity).toFixed(2)}€
                        </p>
                        <p className="text-gray-400 font-semibold text-lg line-through">
                          {Math.round(item.product?.price * item.quantity * 1.25)}€
                        </p>
                      </div>
                      <p className="text-gray-700 mt-1">
                        Cantidad: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeCart(item.id)}
                    className="mt-4 sm:mt-0 bg-gradient-to-r from-red-500 to-pink-700 text-white px-4 py-2 rounded-xl shadow hover:shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>

       <div className="mt-8 p-6 bg-white rounded-2xl shadow flex flex-col sm:flex-row items-center justify-between gap-4">
  {/* Total y descuento */}
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-4">
      <p className="text-xl font-bold">Total:</p>  
      <p className="text-lg font-bold text-red-600">
        {totalPrice.toFixed(2)}€
      </p>
      <p className="text-gray-400 font-semibold line-through text-lg">
        {totalOriginal}€
      </p>
    
    </div>
    <p className="text-red-500 font-medium text-sm">
      Has ahorrado: {totalDiscount.toFixed(2)}€
    </p>
  </div>


              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={checkout}
                  disabled={checkoutLoading || !cart.length}
                  className="text-white
                             bg-gradient-to-r from-green-400 to-green-600
                             hover:from-green-500 hover:to-green-700
                             transition-all duration-300 hover:-translate-y-1 hover:scale-105 flex justify-center items-center gap-2 px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl transform disabled:cursor-not-allowed"
                >
                  {checkoutLoading ? "Procesando..." : "Confirmar Compra"}
                </button>

                <button
                  onClick={() => navigate("/home")}
                  className="bg-gradient-to-r from-blue-600 to-purple-800 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:from-blue-500 hover:to-purple-600 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Inicio
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
