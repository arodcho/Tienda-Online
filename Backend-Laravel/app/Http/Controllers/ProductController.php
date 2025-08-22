<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Listar todos los productos
    public function index()
    {
        // Retorna todos los productos en formato JSON
        return response()->json(Product::all(), 200);
    }

    // Mostrar un producto específico
    public function show($id)
    {
        // dd($id);

        // Busca el producto por ID y retorna en formato JSON
        $product = Product::find($id);
        // dd($product);

        // Si el producto no existe, retorna un error 404
        if (!$product) {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }

        // Retorna el producto encontrado
        return response()->json($product, 200);
    }
}
