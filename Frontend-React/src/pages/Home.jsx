// Importaciones de componentes
import Navbar from "../components/Navbar"; // Barra de navegación
import Hero from "../components/Hero"; // Sección principal destacada (hero)
import ProductsList from "../features/products/ProductList"; // Lista de productos

/**
 * Componente principal de la página Home
 * @returns JSX con la estructura de la página principal
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar: barra de navegación superior */}
      <Navbar />

      {/* Hero: sección destacada de la página */}
      <Hero />

      {/* Sección de productos */}
      <div id="productos" className="container mx-auto px-6 py-10">
        <h2 className="text-4xl font-extrabold text-gray-800 mt-6 mb-6 text-center">
          Productos Destacados
        </h2>

        {/* Lista de productos */}
        <ProductsList />
      </div>
    </div>
  );
}
