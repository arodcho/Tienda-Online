const API_URL = "http://localhost:8000";

// Productos
export const getProducts = async (token) => {
  const res = await fetch(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getProductById = async (id, token) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// Carrito
export const getCart = async (token) => {
  const res = await fetch(`${API_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const addCart = async (productId, token) => {
  const res = await fetch(`${API_URL}/cartadd/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const deleteCartItem = async (cartItemId, token) => {
  const res = await fetch(`${API_URL}/cartdelet/${cartItemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// Pedidos
export const confirmCheckout = async (token) => {
  const res = await fetch(`${API_URL}/checkout`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getOrders = async (token) => {
  const res = await fetch(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
