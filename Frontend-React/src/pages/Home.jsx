import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductsList from "../features/products/ProductList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
     <div id="productos" className="container mx-auto px-6 py-10">
  <h2 className="text-4xl font-extrabold text-gray-800 mt-6 mb-6 text-center">
    Productos Destacados
  </h2>
  <ProductsList />
</div>

    </div>
  );
}
