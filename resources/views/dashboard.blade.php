<h1>Prueba</h1>

<button id="loginBtn">Autenticación con Google</button>
<div id="info" style="margin-top:20px;"></div>
<button id="getProducts" style="display:none;">Ver Productos</button>
<button id="getCart" style="display:none;">Ver Carrito</button>
<button id="getHistory" style="display:none;">Historial de Compras</button>
<button id="logout" style="display:none;">Cerrar Sesión</button>

<div id="products" style="margin-top:20px;"></div>
<div id="cart" style="margin-top:20px;"></div>
<button id="checkoutBtn" style="display:none; margin-top:10px;">Confirmar Compra</button>

<div id="history" style="margin-top:20px;"></div>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const $ = id => document.getElementById(id);
        const infoDiv = $('info');
        const loginBtn = $('loginBtn');
        const logoutBtn = $('logout');
        const productsDiv = $('products');
        const cartDiv = $('cart');
        const historyDiv = $('history');
        const getProductsBtn = $('getProducts');
        const getCartBtn = $('getCart');
        const getHistoryBtn = $('getHistory');
        const checkoutBtn = $('checkoutBtn');

        // Mostrar/ocultar elementos
        function setDisplay(elements, display) {
            elements.forEach(el => el.style.display = display);
        }

        // Mostrar información del usuario
        function showUserInfo(token, user, userId) {
            infoDiv.innerHTML = `<p><strong>Usuario:</strong> ${user}</p>
                             <p><strong>ID:</strong> ${userId}</p>`;
            setDisplay([loginBtn], 'none');
            setDisplay([logoutBtn, getProductsBtn, getCartBtn, getHistoryBtn], 'inline-block');
            localStorage.setItem('token', token);
            localStorage.setItem('user', user);
            localStorage.setItem('userId', userId);
        }

        // Cerrar sesión
        function logout() {
            [infoDiv, productsDiv, cartDiv, historyDiv].forEach(div => div.innerHTML = '');
            setDisplay([logoutBtn, getProductsBtn, getCartBtn, getHistoryBtn, checkoutBtn], 'none');
            setDisplay([loginBtn], 'inline-block');
            ['token', 'user', 'userId'].forEach(k => localStorage.removeItem(k));
        }

        // Función para hacer peticiones con autenticación
        async function fetchWithAuth(url, options = {}) {
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': 'Bearer ' + token,
                ...options.headers
            };
            const res = await fetch(url, {
                ...options,
                headers
            });
            if (!res.ok) throw new Error((await res.json()).error || 'Error');
            return res.json();
        }

        // Cargar productos
        async function loadProducts() {
            try {
                const data = await fetchWithAuth('/products');
                productsDiv.innerHTML = '<h3>Productos:</h3><ul>' +
                    data.map(p => {
                        if (p.stock && p.stock > 0) {
                            return `<li>${p.name} - ${p.price}€ <button onclick="addToCart(${p.id})">Añadir al carrito</button></li>`;
                        } else {
                            return `<li>${p.name} - ${p.price}€ <button disabled style="background:#ccc;cursor:not-allowed;">Agotado</button></li>`;
                        }
                    }).join('') +
                    '</ul>';
            } catch (err) {
                productsDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
            }
        }

        // Añadir producto al carrito
        window.addToCart = async (productId) => {
            try {
                await fetchWithAuth(`/cartadd/${productId}`);
                alert('Producto agregado al carrito');
                loadCart();
            } catch (err) {
                alert(err.message);
            }
        };

        // Cargar carrito
        async function loadCart() {
            try {
                const data = await fetchWithAuth('/cart');
                cartDiv.innerHTML = '<h3>Carrito:</h3><ul>' +
                    data.map(c =>
                        `<li>${c.product.name} - ${c.product.price}€ - Cantidad: ${c.quantity} <button onclick="removeFromCart(${c.id})">Eliminar</button></li>`
                        ).join('') +
                    '</ul>';
                checkoutBtn.style.display = data.length > 0 ? 'inline-block' : 'none';
            } catch (err) {
                cartDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
                checkoutBtn.style.display = 'none';
            }
        }

        // Eliminar producto del carrito
        window.removeFromCart = async (cartItemId) => {
            try {
                await fetchWithAuth(`/cartdelet/${cartItemId}`);
                loadCart();
            } catch (err) {
                alert(err.message);
            }
        };

        // Confirmar compra
        async function confirmarCompra() {
            try {
                const data = await fetchWithAuth('/checkout');
                alert('Compra confirmada para el pedido con ID: ' + data.order.id);
                loadCart();
            } catch (err) {
                alert(err.message);
            }
        }

        // Formatear fecha
        function formatDate(dateStr) {
            const d = new Date(dateStr);
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}/${month}/${year}`;
        }

        // Cargar historial de compras
        async function loadHistory() {
            try {
                const data = await fetchWithAuth('/orders'); // endpoint historial
                historyDiv.innerHTML = '<h3>Historial de Compras:</h3>' +
                    data.map(o => `<div style="margin-bottom:20px; border-bottom:1px solid #ccc; padding-bottom:10px;">
                        <strong>Pedido #${o.id}</strong> - Total: ${o.total}€ - Fecha: ${formatDate(o.created_at)}
                        <ul>` +
                        o.items.map(i => `<li>${i.product.name} x${i.quantity} - ${i.price}€</li>`).join(
                        '') +
                        `</ul></div>`).join('');
            } catch (err) {
                historyDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
            }
        }

        checkoutBtn.addEventListener('click', confirmarCompra);
        getHistoryBtn.addEventListener('click', loadHistory);

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
            window.location.href = '{{ url('auth/google/redirect') }}';
        });
        logoutBtn.addEventListener('click', logout);
        getProductsBtn.addEventListener('click', loadProducts);
        getCartBtn.addEventListener('click', loadCart);
    });
</script>
