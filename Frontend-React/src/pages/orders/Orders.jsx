import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useOrders } from "../../features/orders/OrdersContext";
import OrderItem from "../../features/orders/OrderItems";
import { filterOrders } from "../../utils/filtersOrders";

export default function Orders() {
  const { orders, loadingOrders, error } = useOrders();
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const filteredOrders = filterOrders(orders, search, dateFrom, dateTo);

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

        {/* Barra de carga */}
        {loadingOrders && (
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
            <div className="bg-blue-600 h-4 animate-pulse w-3/4"></div>
          </div>
        )}

        {/* Mensaje si no hay coincidencias */}
        {!loadingOrders && filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No se encontraron pedidos.</p>
        )}

        {/* Grid de pedidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>

        {/* Mostrar error */}
        {error && (
          <p className="text-center text-red-500 font-semibold mt-10">{error}</p>
        )}
      </div>
    </div>
  );
}
