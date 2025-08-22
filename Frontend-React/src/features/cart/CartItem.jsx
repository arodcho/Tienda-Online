/**
 * Componente para mostrar un solo producto dentro del carrito
 * @param {Object} props
 * @param {Object} props.item - Producto del carrito
 * @param {Function} props.removeCart - Función para eliminar el producto del carrito
 */
export default function CartItem({ item, removeCart }) {
  const price = item.product?.price || 0;
  const totalItem = price * item.quantity;
  const originalPrice = Math.round(totalItem * 1.25);

  return (
    <li className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-2xl shadow hover:shadow-xl transition">
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
            <p className="text-red-600 font-bold text-lg">{totalItem.toFixed(2)}€</p>
            <p className="text-gray-400 font-semibold text-lg line-through">{originalPrice}€</p>
          </div>
          <p className="text-gray-700 mt-1">Cantidad: {item.quantity}</p>
        </div>
      </div>
      <button
        onClick={() => removeCart(item.id)}
        className="mt-4 sm:mt-0 bg-gradient-to-r from-red-500 to-pink-700 text-white px-4 py-2 rounded-xl shadow hover:shadow-lg hover:from-red-600 hover:to-pink-600 transform hover:-translate-y-0.5 transition-all duration-200"
      >
        Eliminar
      </button>
    </li>
  );
}
