<h1>Prueba</h1>

<button id="loginBtn">Autenticación con Google</button>
<div id="info" style="margin-top:20px;"></div>
<button id="getProducts" style="display:none;">Ver Productos</button>
<button id="getCart" style="display:none;">Ver Carrito</button>
<button id="logout" style="display:none;">Cerrar Sesión</button>

<div id="products" style="margin-top:20px;"></div>
<div id="cart" style="margin-top:20px;"></div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const infoDiv = document.getElementById('info');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logout');
    const productsDiv = document.getElementById('products');
    const cartDiv = document.getElementById('cart');
    const getProductsBtn = document.getElementById('getProducts');
    const getCartBtn = document.getElementById('getCart');

    // Mostrar información del usuario
    function showUserInfo(token, user, userId) {
        infoDiv.innerHTML = `<p><strong>Usuario:</strong> ${user}</p>
                             <p><strong>ID:</strong> ${userId}</p>`;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        getProductsBtn.style.display = 'inline-block';
        getCartBtn.style.display = 'inline-block';
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        localStorage.setItem('userId', userId);
    }

    // Cerrar sesión borrando datos localstorage
    function logout() {
        infoDiv.innerHTML = '';
        productsDiv.innerHTML = '';
        cartDiv.innerHTML = '';
        logoutBtn.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        getProductsBtn.style.display = 'none';
        getCartBtn.style.display = 'none';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
    }

    // Cargar productos 
    async function loadProducts() {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/products', {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            if (!res.ok) throw new Error('No autorizado');
            const data = await res.json();
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

    // Agregar producto al carrito
    window.addToCart = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/cartadd/${productId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });
            if (!res.ok) throw new Error('Error al agregar producto');
            alert('Producto agregado al carrito');
             loadCart();
        } catch (err) {
            alert(err.message);
        }
    };

    

    // Cargar carrito
    async function loadCart() {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/cart', {
                headers: { 'Authorization': 'Bearer ' + token }
            });
            if (!res.ok) throw new Error('No autorizado');
            const data = await res.json();
            cartDiv.innerHTML = '<h3>Carrito:</h3><ul>' +
                data.map(c => `
                    <li>
                        ${c.product.name} - ${c.product.price}€ - Cantidad: ${c.quantity}
                        <button onclick="removeFromCart(${c.id})">Eliminar</button>
                    </li>`
                ).join('') +
                '</ul>';
        } catch (err) {
            cartDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
        }
    }

    // Eliminar producto del carrito
    window.removeFromCart = async (cartItemId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/cartdelet/${cartItemId}`, {
                method: 'get',
                headers: { 'Authorization': 'Bearer ' + token }
            });
            if (!res.ok) throw new Error('Error al eliminar producto');
            loadCart();
        } catch (err) {
            alert(err.message);
        }
    };

    // Comprobar sesión activa
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

    // Eventos
    loginBtn.addEventListener('click', () => {
        window.location.href = '{{ url("auth/google/redirect") }}';
    });
    logoutBtn.addEventListener('click', logout);
    getProductsBtn.addEventListener('click', loadProducts);
    getCartBtn.addEventListener('click', loadCart);
});
</script>
