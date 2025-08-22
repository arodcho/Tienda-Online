<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

/**
 * Controlador para manejar productos.
 * Permite listar todos los productos y obtener uno específico.
 */
class ProductController extends Controller
{
    /**
     * Listar todos los productos.
     *
     * @return \Illuminate\Http\JsonResponse Lista de productos en formato JSON
     */
    public function index()
    {
        // Retorna todos los productos en formato JSON
        return response()->json(Product::all(), 200);
    }

    /**
     * Mostrar un producto específico por su ID.
     *
     * @param int $id ID del producto
     * @return \Illuminate\Http\JsonResponse Producto encontrado o mensaje de error
     */
    public function show($id)
    {
        // dd($id); // Depuración: muestra el ID recibido

        // Busca el producto por ID
        $product = Product::find($id);
        // dd($product); // Depuración: muestra el producto encontrado

        // Si el producto no existe, retorna error 404
        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        // Retorna el producto encontrado
        return response()->json($product, 200);
    }
}
