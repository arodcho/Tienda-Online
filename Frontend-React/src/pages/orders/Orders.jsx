// pages/OrdersPage.jsx
import { useOrders } from "../../features/orders/OrdersContext";

export default function Orders() {
  const { orders, loading, error } = useOrders();

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p>{error}</p>;
  if (!orders.length) return <p>No tienes órdenes registradas</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Mis compras</h1>
      <ul className="space-y-6">
        {orders.map((order) => (
          <li key={order.id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold">Orden #{order.id}</p>
            <p>Total: {order.total}€</p>
            <p>Fecha: {new Date(order.created_at).toLocaleString()}</p>
            <ul className="mt-2 pl-4 list-disc">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.product?.name || "Producto desconocido"} x{" "}
                  {item.quantity} - {item.price}€
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
