<h1>Prueba Login</h1>

<button id="loginBtn">Autenticación con Google</button>
<div id="info" style="margin-top:20px;"></div>
<button id="logout" style="display:none;">Cerrar Sesión</button>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const infoDiv = document.getElementById('info');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logout');

    // Función para mostrar información del usuario
    function showUserInfo(token, user) {
        infoDiv.innerHTML = `<p><strong>Token:</strong> ${token}</p>
                             <p><strong>Usuario:</strong> ${user}</p>`;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
    }

    // Función para cerrar sesión
    function logout() {
        infoDiv.innerHTML = '';
        logoutBtn.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    // Comprobar si ya hay token guardado
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
        showUserInfo(storedToken, storedUser);
    } else {
        // Tomar token y usuario de la URL si viene del login
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const user = params.get('user');
        if (token && user) {
            showUserInfo(token, user);
            // Limpiar URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // Eventos de botones
    loginBtn.addEventListener('click', () => {
        window.location.href = '{{ url("auth/google/redirect") }}';
    });
    logoutBtn.addEventListener('click', logout);
});
</script>
