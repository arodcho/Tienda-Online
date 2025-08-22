import ProductsList from "../features/products/ProductList";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">Productos</h1>
      <ProductsList />
    </div>
  );
}
