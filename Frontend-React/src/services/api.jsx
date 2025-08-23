// Base URL de la API
const API_URL = "http://localhost:8000";

const getCsrfToken = async () => {
  const res = await fetch("http://localhost:8000/csrf-token", {
    credentials: "include", // importante para que Laravel gestione la sesión
  });
  const data = await res.json();
  return data.csrf_token;
};


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
  // Obtener token CSRF desde el endpoint
  const csrfToken = await getCsrfToken();

  // Hacer POST al carrito con JWT y CSRF
  const res = await fetch(`${API_URL}/cartadd`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "X-CSRF-TOKEN": csrfToken,
    },
    credentials: "include", // necesario para Laravel
    body: JSON.stringify({ product_id: productId }),
  });

  if (!res.ok) throw new Error("Error al agregar al carrito");
  return res.json();
};


/**
 * Eliminar un item del carrito
 * @param {number|string} cartItemId - ID del item del carrito a eliminar
 * @param {string} token - Token de autenticación Bearer
 * @returns {Promise<Object>} - Resultado de la operación en formato JSON
 */
export const deleteCartItem = async (cartItemId, token) => {
  // Obtener token CSRF desde el endpoint
  const resCsrf = await fetch(`${API_URL}/csrf-token`, {
    credentials: "include",
  });
  const { csrf_token } = await resCsrf.json();

  // Hacer DELETE al carrito con JWT y CSRF
  const res = await fetch(`${API_URL}/cart/${cartItemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrf_token,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include", // necesario para Laravel
  });

  if (!res.ok) throw new Error("Error al eliminar el item del carrito");
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
  const csrfToken = await getCsrfToken();

  const res = await fetch("http://localhost:8000/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken,
      Authorization: `Bearer ${token}`,
    },
    credentials: "include", // necesario para Laravel
  });

  if (!res.ok) throw new Error("Error al confirmar el checkout");
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
