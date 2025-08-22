import { useCart } from "../../features/cart/CartContext";
import { useOrders } from "../../features/orders/OrdersContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeCart, loading: cartLoading } = useCart();
  const { checkout, loading: checkoutLoading, toast } = useOrders();
  const navigate = useNavigate();

  if (cartLoading) return <p>Cargando carrito...</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      {toast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {toast}
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6">Carrito</h1>

      {!cart.length ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between mb-4 p-4 bg-white rounded shadow"
            >
              <span>
                {item.product?.name || "Producto desconocido"} x {item.quantity}
              </span>
              <button
                onClick={() => removeCart(item.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex gap-4 mt-6">
        <button
          onClick={checkout}
          disabled={checkoutLoading || !cart.length}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {checkoutLoading ? "Procesando..." : "Finalizar Compra"}
        </button>

        <button
          onClick={() => navigate("/home")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Volver a Inicio
        </button>
      </div>
    </div>
  );
}
