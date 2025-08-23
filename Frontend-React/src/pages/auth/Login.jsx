import React from "react";

/**
 * Componente de Login.
 * Muestra una pantalla de bienvenida e inicia sesión usando Google OAuth.
 */
function Login() {
  /**
   * Redirige al usuario a la URL de autenticación de Google.
   */
  const handleGoogleLogin = () => {
    window.open("http://127.0.0.1:8000/auth/google/redirect", "_self");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4"
      style={{
        backgroundImage: `linear-gradient(0deg, #f1fff9, #f1fff900 30%),
                          radial-gradient(circle at 0 0, #5fd5b6 0, #5fd5b600 30%),
                          linear-gradient(180deg, #79dfffb3 -10%, #79dfff00 70%),
                          radial-gradient(circle at 95% 0, #b7d11e 0, #5fd5b600 20%)`,
      }}
    >
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <img src="/img/logo.webp" alt="Logo" className="w-20 h-20 object-contain mb-4" />

        {/* Título */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">
          Bienvenido
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Inicia sesión con tu cuenta de Google para continuar
        </p>

        {/* Botón Google */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 active:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
        >
          <img src="/img/google-logo.webp" alt="Google logo" className="w-6 h-6" />
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
}

export default Login;
