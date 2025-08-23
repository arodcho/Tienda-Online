import { useState } from "react";
import { useCart } from "../features/cart/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <nav
      style={{
        backgroundImage: `linear-gradient(0deg, #f1fff9, #f1fff900 30%),
                          radial-gradient(circle at 0 0, #5fd5b6 0, #5fd5b600 30%),
                          linear-gradient(180deg, #79dfffb3 -10%, #79dfff00 70%),
                          radial-gradient(circle at 95% 0, #b7d11e 0, #5fd5b600 20%)`,
      }}
      className="shadow-md py-4 px-6 sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo + Nombre */}
        <div
          className="flex items-center gap-3 cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => (window.location.href = "/")}
        >
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 p-1 border-white shadow-xl flex items-center justify-center">
            <img
              src="/img/logo.webp"
              alt="Logo"
              className="w-14 h-14 object-contain rounded-full"
            />
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text
                         bg-gradient-to-r from-green-600 to-blue-600
                         drop-shadow-lg hover:from-green-500 hover:to-blue-500 transition-all duration-300">
            ShopCord
          </h1>
        </div>

        {/* Botones y avatar */}
        <div className="flex items-center gap-4 relative">
          {/* Carrito solo visible en sm+ */}
          <button
            onClick={() => (window.location.href = "/cart")}
            className="hidden sm:flex relative items-center gap-2 px-5 py-2 rounded-full font-semibold text-white shadow-lg
                       bg-gradient-to-r from-blue-400 to-indigo-600
                       hover:from-blue-500 hover:to-indigo-700
                       transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7h14l-2-7M17 21a2 2 0 100-4 2 2 0 000 4zm-10 0a2 2 0 100-4 2 2 0 000 4z"
              />
            </svg>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cart.length}
              </span>
            )}
          </button>

          {/* Avatar */}
          <div className="relative">
            <img
              src="/img/avatar.webp"
              alt="Usuario"
              className="w-16 h-16 rounded-full cursor-pointer border-2 border-white shadow-md"
              onClick={() => setOpenMenu(!openMenu)}
            />

            {/* Menú desplegable */}
            {openMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg py-2 flex flex-col z-50">
                {/* Agregar carrito en móvil */}
                <button
                  onClick={() => (window.location.href = "/cart")}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg text-left sm:hidden"
                >
                  Carrito
                </button>

                <button
                  onClick={() => (window.location.href = "/")}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg text-left"
                >
                  Inicio
                </button>
                <button
                  onClick={() => (window.location.href = "/orders")}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg text-left"
                >
                  Mis pedidos
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg text-left"
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
