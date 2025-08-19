<h1>Prueba Login</h1>

<button id="loginBtn">Autenticación con Google</button>
<div id="info" style="margin-top:20px;"></div>
<button id="getProducts" style="display:none;">Ver Productos</button>
<button id="logout" style="display:none;">Cerrar Sesión</button>

<div id="products" style="margin-top:20px;"></div>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const infoDiv = document.getElementById('info');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logout');
    const productsDiv = document.getElementById('products');
    const getProductsBtn = document.getElementById('getProducts');

    // Mostrar info de usuario
    function showUserInfo(token, user) {
        infoDiv.innerHTML = `<p><strong>Usuario:</strong> ${user}</p>`;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        getProductsBtn.style.display = 'inline-block';
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
    }

    // Cerrar sesión
    function logout() {
        infoDiv.innerHTML = '';
        productsDiv.innerHTML = '';
        logoutBtn.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        getProductsBtn.style.display = 'none';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // Cargar productos desde la API
    async function loadProducts() {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/products', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

            if (!res.ok) {
                throw new Error('No autorizado');
            }

            const data = await res.json();
            productsDiv.innerHTML = '<h3>Productos:</h3><ul>' +
                data.map(p => `<li>${p.name} - ${p.price}€</li>`).join('') +
                '</ul>';
        } catch (err) {
            productsDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
        }
    }

    // Comprobar sesión activa
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
        showUserInfo(storedToken, storedUser);
    } else {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const user = params.get('user');
        if (token && user) {
            showUserInfo(token, user);
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // Eventos
    loginBtn.addEventListener('click', () => {
        window.location.href = '{{ url("auth/google/redirect") }}';
    });
    logoutBtn.addEventListener('click', logout);
    getProductsBtn.addEventListener('click', loadProducts);
});
</script>
