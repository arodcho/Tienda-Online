import Navbar from "../../components/Navbar";
import { useCart } from "../../features/cart/CartContext";
import { useOrders } from "../../features/orders/OrdersContext";
import { useNavigate } from "react-router-dom";
import CartItem from "../../features/cart/CartItem";
import CartTotals from "../../features/cart/CartTotals";

/**
 * Componente principal del carrito de compras
 */
export default function Cart() {
  const { cart, removeCart, loading: cartLoading } = useCart(); // Estado del carrito y funciones
  const { checkout, loading: checkoutLoading, toast } = useOrders(); // Funciones de pedido y estado
  const navigate = useNavigate();

  // Cálculo de totales
  const totalPrice = cart.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);
  const totalOriginal = cart.reduce((total, item) => total + Math.round((item.product?.price || 0) * item.quantity * 1.25), 0);
  const totalDiscount = totalOriginal - totalPrice;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        {toast && <div  className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-green-600 text-white px-6 py-2 rounded-full shadow-lg animate-slide-in z-[9999]"
  >{toast}</div>}

        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Carrito</h1>

        {cartLoading ? (
          <div className="w-full bg-gray-200 rounded-full h-4 mb-8 overflow-hidden">
            <div className="bg-blue-600 h-4 animate-pulse w-3/4"></div>
          </div>
        ) : cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-500 text-lg text-center">Explora nuestros productos y añade tus favoritos.</p>
            <button onClick={() => navigate("/home")} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl hover:bg-blue-700 transition-all duration-300">
              Ir a la tienda
            </button>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.map(item => <CartItem key={item.id} item={item} removeCart={removeCart} />)}
            </ul>
            <CartTotals
              totalPrice={totalPrice}
              totalOriginal={totalOriginal}
              totalDiscount={totalDiscount}
              checkout={checkout}
              checkoutLoading={checkoutLoading}
              navigate={navigate}
            />
          </>
        )}
      </div>
    </div>
  );
}
