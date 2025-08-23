/**
 * Componente para mostrar los totales del carrito y botones de acción
 * @param {Object} props
 * @param {number} props.totalPrice - Precio total real
 * @param {number} props.totalOriginal - Precio original sin descuento
 * @param {number} props.totalDiscount - Diferencia entre original y real
 * @param {Function} props.checkout - Función para confirmar compra
 * @param {boolean} props.checkoutLoading - Estado de carga de checkout
 * @param {Function} props.navigate - Función para navegar a otra página
 */
export default function CartTotals({ totalPrice, totalOriginal, totalDiscount, checkout, checkoutLoading, navigate }) {
  return (
    <div className="mt-8 p-6 bg-white rounded-2xl shadow flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <p className="text-xl font-bold">Total:</p>
          <p className="text-lg font-bold text-red-600">{totalPrice.toFixed(2)}€</p>
          <p className="text-gray-400 font-semibold line-through text-lg">{totalOriginal}€</p>
        </div>
        <p className="text-red-500 font-medium text-sm">Has ahorrado: {totalDiscount.toFixed(2)}€</p>
      </div>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={checkout}
          disabled={checkoutLoading || !totalPrice}
          className="text-white bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-all duration-300 hover:-translate-y-1 hover:scale-105 flex justify-center items-center gap-2 px-6 py-3 rounded-xl shadow-lg hover:shadow-2xl disabled:cursor-not-allowed"
        >
          {checkoutLoading ? "Procesando..." : "Confirmar Compra"}
        </button>
      </div>
    </div>
  );
}
