import useProducts from "./useProducts";

export default function ProductsList() {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  return (
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
          {p.image && (
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
          )}
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-blue-600 mb-2">{p.name}</h3>
            <p className="text-gray-600 mb-4">{p.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
