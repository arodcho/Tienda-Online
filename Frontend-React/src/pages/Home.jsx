import ProductsList from "../features/products/ProductList";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Productos
      </h1>
      <div className="flex justify-end mb-4">
      <button
  onClick={() => window.location.href = "/cart"}
  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  Ver Carrito
</button>

      </div>
      <ProductsList />
    </div>
  );
}
