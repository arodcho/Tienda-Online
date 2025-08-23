<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
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
     * Recibe product_id desde el body de la petición.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validación del body de la petición
        $request->validate([
            'product_id' => 'required|integer|exists:products,id',
        ]);

        // Obtener usuario autenticado mediante JWT
        $user = JWTAuth::parseToken()->authenticate();
        $productId = $request->product_id;

        // Depuración: mostrar usuario o product_id
        // dd($user, $productId);

        // Buscar si el producto ya está en el carrito del usuario
        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $productId)
            ->first();

        // Si existe, incrementar cantidad; si no, crear nuevo item
        if ($cartItem) {
            $cartItem->increment('quantity');
            // dd($cartItem); // depuración: item actualizado
        } else {
            $cartItem = CartItem::create([
                'user_id' => $user->id,
                'product_id' => $productId,
                'quantity' => 1
            ]);
            // dd($cartItem); // depuración: item creado
        }

        return response()->json($cartItem, 201);
    }

    /**
     * Eliminar un item del carrito del usuario autenticado.
     *
     * @param int $id ID del item del carrito
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // Obtener usuario autenticado mediante JWT
        $user = JWTAuth::parseToken()->authenticate();

        // Buscar el item del carrito del usuario
        $cartItem = CartItem::where('user_id', $user->id)->where('id', $id)->first();

        // dd($user, $cartItem); // depuración: mostrar usuario e item

        if ($cartItem) {
            $cartItem->delete();
            // dd('Item eliminado'); // depuración: confirmar eliminación
            return response()->json(['message' => 'Producto eliminado'], 200);
        }

        return response()->json(['message' => 'No encontrado'], 404);
    }
}
