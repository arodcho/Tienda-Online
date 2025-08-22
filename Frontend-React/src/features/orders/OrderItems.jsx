import React from "react";

/**
 * Componente OrderItem
 * -------------------
 * Muestra un pedido individual con sus productos, precios y descuentos.
 * 
 * Props:
 * - order: objeto que representa un pedido con la siguiente estructura:
 */
export default function OrderItem({ order }) {
  // Calcular el total original sin descuento
  const totalOriginal = order.items.reduce(
    (sum, item) =>
      sum + Math.round((Number(item.price) || 0) * 1.25 * item.quantity),
    0
  );

  // Calcular cuánto se ha descontado
  const totalDiscount = (totalOriginal - (Number(order.total) || 0)).toFixed(2);

  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition flex flex-col gap-4">
      
      {/* Header del pedido */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <p className="font-semibold text-lg text-gray-800">Pedido #{order.id}</p>
        <p className="text-gray-500 text-sm">
          {new Date(order.created_at).toLocaleString()}
        </p>
      </div>

      {/* Lista de productos */}
      <div className="flex flex-col gap-2">
        {order.items.map((item) => {
          const priceNum = Number(item.price) || 0; // Precio unitario
          const originalPrice = Math.round(priceNum * 1.25); // Precio original sin descuento
          const totalItem = priceNum * item.quantity; // Precio total por cantidad
          const discount = originalPrice * item.quantity - totalItem; // Ahorro individual

          return (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <img
                src={item.product?.image || "/img/default-product.webp"}
                alt={item.product?.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {item.product?.name || "Producto desconocido"}
                </p>
                <p className="text-gray-700 text-sm">
                  Cantidad: {item.quantity} x {priceNum.toFixed(2)}€
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-red-600 font-bold text-sm">
                    {totalItem.toFixed(2)}€
                  </p>
                  <p className="text-gray-400 line-through text-sm">
                    {(originalPrice * item.quantity).toFixed(2)}€
                  </p>
                </div>
                {discount > 0 && (
                  <p className="text-red-500 text-xs">Ahorro: {discount.toFixed(2)}€</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Totales del pedido */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex flex-col gap-1 items-end">
          <div className="flex items-center gap-4">
            <p className="text-lg font-bold text-red-600">
              {(Number(order.total) || 0).toFixed(2)}€
            </p>
            <p className="text-gray-400 font-semibold line-through text-lg">
              {totalOriginal.toFixed(2)}€
            </p>
          </div>
          <p className="text-red-500 font-medium text-sm">
            Has ahorrado: {totalDiscount}€
          </p>
        </div>
      </div>
    </div>
  );
}
