<h1>Prueba Login</h1>

<button id="loginBtn">Autenticación con Google</button>

<div id="info" style="margin-top:20px;"></div>

<button id="logout" style="display:none;">Cerrar Sesión</button>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const user = params.get('user');

    const infoDiv = document.getElementById('info');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logout');

    // Mostrar información del usuario
    function showUserInfo(token, user) {
        infoDiv.innerHTML = `
            <p><strong>Token:</strong> ${token}</p>
            <p><strong>Usuario:</strong> ${user}</p>
        `;
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    }

    // Resetear UI al cerrar sesión
    function resetUI() {
        infoDiv.innerHTML = '';
        logoutBtn.style.display = 'none';
        loginBtn.style.display = 'inline-block';
    }

    // Evento del botón de login
    loginBtn.addEventListener('click', () => {
        window.location.href = '{{ url("auth/google/redirect") }}';
    });

    // Evento del botón de logout
    logoutBtn.addEventListener('click', () => {
        window.history.replaceState({}, document.title, window.location.pathname);
        resetUI();
        alert('Sesión cerrada');
    });

    // Inicializar UI si ya hay token en la URL
    if (token && user) {
        showUserInfo(token, user);
    }
});
</script>
