import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useOrders } from "../../features/orders/OrdersContext";

export default function Orders() {
  const { orders, loading, error } = useOrders();
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-24 h-24 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="ml-4 text-gray-600 text-lg">Cargando historial...</p>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 font-semibold mt-10">{error}</p>
    );

  if (!orders.length)
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <p className="text-gray-500 text-lg">No tienes pedidos registradas.</p>
          <button
            onClick={() => (window.location.href = "/home")}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-2xl transition-all duration-300"
          >
            Explorar productos
          </button>
        </div>
      </>
    );

  // Filtrar por ID y rango de fechas
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toString().includes(search);
    const orderDate = new Date(order.created_at).setHours(0,0,0,0);
    const fromDate = dateFrom ? new Date(dateFrom).setHours(0,0,0,0) : null;
    const toDate = dateTo ? new Date(dateTo).setHours(0,0,0,0) : null;
    const matchesFrom = fromDate ? orderDate >= fromDate : true;
    const matchesTo = toDate ? orderDate <= toDate : true;
    return matchesSearch && matchesFrom && matchesTo;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Navbar />
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">
          Mis pedidos
        </h1>

        {/* Buscador y filtros */}
        <div className="mb-6 flex flex-col sm:flex-row justify-center gap-4 items-center">
          <input
            type="text"
            placeholder="Buscar por ID de pedido..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 rounded-xl shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="px-4 py-2 rounded-xl shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="px-4 py-2 rounded-xl shadow-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No se encontraron pedidos.</p>
        )}

        {/* Grid de 2 columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOrders.map((order) => {
            const totalOriginal = order.items.reduce(
              (sum, item) =>
                sum + Math.round((Number(item.price) || 0) * 1.25 * item.quantity),
              0
            );
            const totalDiscount = (totalOriginal - (Number(order.total) || 0)).toFixed(2);

            return (
              <div
                key={order.id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition flex flex-col gap-4"
              >
                {/* Header de la orden */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <p className="font-semibold text-lg text-gray-800">
                    Pedido #{order.id}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                {/* Productos de la orden */}
                <div className="flex flex-col gap-2">
                  {order.items.map((item) => {
                    const priceNum = Number(item.price) || 0;
                    const originalPrice = Math.round(priceNum * 1.25);
                    const totalItem = priceNum * item.quantity;
                    const discount = originalPrice * item.quantity - totalItem;

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
                            <p className="text-red-500 text-xs">
                              Ahorro: {discount.toFixed(2)}€
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Total de la orden */}
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
          })}
        </div>
      </div>
    </div>
  );
}
