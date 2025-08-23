// Base URL de la API
const API_URL = "http://localhost:8000";

/* ==========================
   Productos
========================== */

/**
 * Obtener todos los productos
 * @param {string} token - Token de autenticación Bearer
 * @returns {Promise<Object>} - Lista de productos en formato JSON
 */
export const getProducts = async (token) => {
  const res = await fetch(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

/**
 * Obtener un producto por su ID
 * @param {number|string} id - ID del producto
 * @param {string} token - Token de autenticación Bearer
 * @returns {Promise<Object>} - Información del producto en formato JSON
 */
export const getProductById = async (id, token) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

/* ==========================
   Carrito
========================== */

/**
 * Obtener los items del carrito del usuario
 * @param {string} token - Token de autenticación Bearer
 * @returns {Promise<Object>} - Contenido del carrito en formato JSON
 */
export const getCart = async (token) => {
  const res = await fetch(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

/**
 * Añadir un producto al carrito
 * @param {number|string} productId - ID del producto a añadir
 * @param {string} token - Token de autenticación Bearer
 * @returns {Promise<Object>} - Resultado de la operación en formato JSON
 */
export const addCart = async (productId, token) => {
  const res = await fetch(`${API_URL}/cartadd/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

/**
 * Eliminar un item del carrito
 * @param {number|string} cartItemId - ID del item del carrito a eliminar
 * @param {string} token - Token de autenticación Bearer
 * @returns {Promise<Object>} - Resultado de la operación en formato JSON
 */
export const deleteCartItem = async (cartItemId, token) => {
  const res = await fetch(`${API_URL}/cartdelet/${cartItemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

/* ==========================
   Pedidos
========================== */

/**
 * Confirmar el checkout (finalizar compra)
 * @param {string} token - Token de autenticación Bearer
 * @returns {Promise<Object>} - Resultado del checkout en formato JSON
 */
export const confirmCheckout = async (token) => {
  const res = await fetch(`${API_URL}/checkout`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

/**
 * Obtener todos los pedidos del usuario
 * @param {string} token - Token de autenticación Bearer
 * @returns {Promise<Object>} - Lista de pedidos en formato JSON
 */
export const getOrders = async (token) => {
  const res = await fetch(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
