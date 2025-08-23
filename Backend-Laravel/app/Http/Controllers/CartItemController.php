<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

/**
 * Controlador para manejar el carrito de compras.
 * Permite ver, agregar y eliminar productos del carrito.
 */
class CartItemController extends Controller
{
    /**
     * Ver el carrito del usuario autenticado.
     *
     * @return \Illuminate\Http\JsonResponse Lista de items del carrito con productos relacionados
     */
    public function index()
    {
        // Obtener usuario desde el token JWT
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;

        // dd($userId); // Depuración: muestra el ID del usuario

        // Obtener items del carrito junto con los productos relacionados
        $CartItem = CartItem::with('product')->where('user_id', $userId)->get();

        return response()->json($CartItem, 200);
    }

    /**
     * Agregar un producto al carrito del usuario autenticado.
     * Si el producto ya existe, incrementa la cantidad.
     *
     * @param int $id ID del producto a agregar
     * @return \Illuminate\Http\JsonResponse Item agregado o actualizado
     */
    public function store($id)
    {
        // dd($id); // Depuración: muestra el ID del producto

        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;
        // dd($userId); // Depuración: muestra el ID del usuario

        // Verifica si el producto ya está en el carrito
        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $id)
            ->first();

        // Si existe, incrementa cantidad; si no, crea un nuevo item
        if ($cartItem) {
            $cartItem->increment('quantity');
        } else {
            $cartItem = CartItem::create([
                'user_id' => $userId,
                'product_id' => $id,
                'quantity' => 1
            ]);
        }

        return response()->json($cartItem, 201);
    }

    /**
     * Eliminar un producto del carrito del usuario autenticado.
     *
     * @param int $id ID del item del carrito
     * @return \Illuminate\Http\JsonResponse Mensaje de éxito o error
     */
    public function destroy($id)
    {
        // dd($id); // Depuración: muestra el ID del carrito

        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;
        // dd($userId); // Depuración: muestra el ID del usuario

        $CartItem = CartItem::where('user_id', $userId)->where('id', $id)->first();
        // dd($CartItem); // Depuración: muestra el item del carrito encontrado

        if ($CartItem) {
            $CartItem->delete();
            return response()->json(['message' => 'Producto eliminado'], 200);
        }

        return response()->json(['message' => 'No encontrado'], 404);
    }
}
