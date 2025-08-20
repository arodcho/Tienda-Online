<h1>Prueba</h1>

<button id="loginBtn">Autenticación con Google</button>
<div id="info" style="margin-top:20px;"></div>
<button id="getProducts" style="display:none;">Ver Productos</button>
<button id="getCart" style="display:none;">Ver Carrito</button>
<button id="logout" style="display:none;">Cerrar Sesión</button>

<div id="products" style="margin-top:20px;"></div>
<div id="cart" style="margin-top:20px;"></div>
<button id="checkoutBtn" style="display:none; margin-top:10px;">Confirmar Compra</button>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const $ = id => document.getElementById(id);
    const infoDiv = $('info');
    const loginBtn = $('loginBtn');
    const logoutBtn = $('logout');
    const productsDiv = $('products');
    const cartDiv = $('cart');
    const getProductsBtn = $('getProducts');
    const getCartBtn = $('getCart');
    const checkoutBtn = $('checkoutBtn');

    function setDisplay(elements, display) {
        elements.forEach(el => el.style.display = display);
    }

    function showUserInfo(token, user, userId) {
        infoDiv.innerHTML = `<p><strong>Usuario:</strong> ${user}</p>
                             <p><strong>ID:</strong> ${userId}</p>`;
        setDisplay([loginBtn], 'none');
        setDisplay([logoutBtn, getProductsBtn, getCartBtn], 'inline-block');
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        localStorage.setItem('userId', userId);
    }

    function logout() {
        [infoDiv, productsDiv, cartDiv].forEach(div => div.innerHTML = '');
        setDisplay([logoutBtn, getProductsBtn, getCartBtn, checkoutBtn], 'none');
        setDisplay([loginBtn], 'inline-block');
        ['token', 'user', 'userId'].forEach(k => localStorage.removeItem(k));
    }

    async function fetchWithAuth(url, options = {}) {
        const token = localStorage.getItem('token');
        const headers = { 'Authorization': 'Bearer ' + token, ...options.headers };
        const res = await fetch(url, { ...options, headers });
        if (!res.ok) throw new Error((await res.json()).error || 'Error');
        return res.json();
    }

    async function loadProducts() {
        try {
            const data = await fetchWithAuth('/products');
            productsDiv.innerHTML = '<h3>Productos:</h3><ul>' +
                data.map(p => `
                    <li>
                        ${p.name} - ${p.price}€
                        <button onclick="addToCart(${p.id})">Añadir al carrito</button>
                    </li>`
                ).join('') +
                '</ul>';
        } catch (err) {
            productsDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
        }
    }

    window.addToCart = async (productId) => {
        try {
            await fetchWithAuth(`/cartadd/${productId}`);
            alert('Producto agregado al carrito');
            loadCart();
        } catch (err) {
            alert(err.message);
        }
    };

    async function loadCart() {
        try {
            const data = await fetchWithAuth('/cart');
            cartDiv.innerHTML = '<h3>Carrito:</h3><ul>' +
                data.map(c => `
                    <li>
                        ${c.product.name} - ${c.product.price}€ - Cantidad: ${c.quantity}
                        <button onclick="removeFromCart(${c.id})">Eliminar</button>
                    </li>`
                ).join('') +
                '</ul>';
            checkoutBtn.style.display = data.length > 0 ? 'inline-block' : 'none';
        } catch (err) {
            cartDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
            checkoutBtn.style.display = 'none';
        }
    }

    window.removeFromCart = async (cartItemId) => {
        try {
            await fetchWithAuth(`/cartdelet/${cartItemId}`);
            loadCart();
        } catch (err) {
            alert(err.message);
        }
    };

    async function confirmarCompra() {
        try {
            const data = await fetchWithAuth('/checkout');
            alert('Compra confirmada para el pedido con ID: ' + data.order.id);
            loadCart();
        } catch (err) {
            alert(err.message);
        }
    }
    checkoutBtn.addEventListener('click', confirmarCompra);

    // Sesión
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedUserId = localStorage.getItem('userId');
    if (storedToken && storedUser && storedUserId) {
        showUserInfo(storedToken, storedUser, storedUserId);
    } else {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const user = params.get('user');
        const userId = params.get('id');
        if (token && user && userId) {
            showUserInfo(token, user, userId);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    loginBtn.addEventListener('click', () => {
        window.location.href = '{{ url("auth/google/redirect") }}';
    });
    logoutBtn.addEventListener('click', logout);
    getProductsBtn.addEventListener('click', loadProducts);
    getCartBtn.addEventListener('click', loadCart);
});
</script>
