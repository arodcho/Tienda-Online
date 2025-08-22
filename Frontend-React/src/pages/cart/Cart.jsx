import { useCart } from "../../features/cart/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();



  if (!cart.length) return <p>El carrito está vacío</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Carrito</h1>
      
      <button
        onClick={() => navigate("/home")}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Volver a Inicio
      </button>

      <ul>
    {cart.map((item) => (
  <li key={item.id} className="flex justify-between mb-4 p-4 bg-white rounded shadow">
    <span>{item.product?.name || "Producto desconocido"} x {item.quantity}</span>
    <button
      onClick={() => removeFromCart(item.id)}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      Eliminar
    </button>
  </li>
))}

      </ul>
    </div>
  );
}
