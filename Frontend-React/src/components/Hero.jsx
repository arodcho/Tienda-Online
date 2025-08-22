export default function Hero() {
  const scrollToProducts = () => {
    const element = document.getElementById("productos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative w-full h-[500px] md:h-[700px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/img/portada.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay suave con gradiente del navbar */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(0deg, #f1fff9, #f1fff900 30%),
                            radial-gradient(circle at 0 0, #5fd5b6 0, #5fd5b600 30%),
                            linear-gradient(180deg, #79dfffb3 -10%, #79dfff00 70%),
                            radial-gradient(circle at 95% 0, #b7d11e 0, #5fd5b600 20%)`,
          opacity: 0.25, // menor opacidad para ver más la imagen
        }}
      ></div>

      <div className="relative text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text
                       bg-gradient-to-r from-green-600 to-blue-600 drop-shadow-lg mb-4">
          Bienvenido a <span className="text-white">TiendaOnline</span>
        </h1>
        <p className="text-white text-lg md:text-2xl mb-6 drop-shadow-md">
          Descubre los mejores productos al mejor precio
        </p>
        <button
          onClick={scrollToProducts}
          className="px-6 py-3 rounded-full font-semibold text-white shadow-lg
                     bg-gradient-to-r from-green-400 to-green-600
                     hover:from-green-500 hover:to-green-700
                     transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          Explorar Productos
        </button>
      </div>
    </div>
  );
}
