/**
 * Filtra pedidos por ID y rango de fechas
 */
export const filterOrders = (orders, search, dateFrom, dateTo) => {
  return orders.filter((order) => {
    const matchesSearch = order.id.toString().includes(search);
    const orderDate = new Date(order.created_at).setHours(0, 0, 0, 0);
    const fromDate = dateFrom ? new Date(dateFrom).setHours(0, 0, 0, 0) : null;
    const toDate = dateTo ? new Date(dateTo).setHours(0, 0, 0, 0) : null;
    const matchesFrom = fromDate ? orderDate >= fromDate : true;
    const matchesTo = toDate ? orderDate <= toDate : true;
    return matchesSearch && matchesFrom && matchesTo;
  });
};
