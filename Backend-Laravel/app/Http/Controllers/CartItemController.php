<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class CartItemController extends Controller
{
    // Ver carrito
    public function index()
    {

        $user = JWTAuth::parseToken()->authenticate(); // Obtiene el usuario del token
        $userId = $user->id;

        // dd($userId);
        $CartItem = CartItem::with('product')->where('user_id', $userId)->get();
        return response()->json($CartItem, 200);
    }

    // Agregar producto
    public function store($id)
    {
        // dd($id);

        $user = JWTAuth::parseToken()->authenticate(); // Obtiene el usuario del token
        $userId = $user->id;
        // dd($userId);

        // Verifica si el producto ya está en el carrito
        $cartItem = CartItem::where('user_id', $userId)
            ->where('product_id', $id)
            ->first();

        // Si el producto ya está en el carrito, incrementa la cantidad
        if ($cartItem) {
            $cartItem->increment('quantity');
        } else {
            $cartItem = CartItem::create([
                'user_id' => $userId,
                'product_id' => $id,
                'quantity' => 1
            ]);
        }

        // Retorna el carrito actualizado
        return response()->json($cartItem, 201);
    }

    // Eliminar producto del carrito
    public function destroy($id)
    {
        // dd($id);
        $user = JWTAuth::parseToken()->authenticate(); // Obtiene el usuario del token

        $userId = $user->id;
        //  dd($userId);
        $CartItem = CartItem::where('user_id', $userId)->where('id', $id)->first();
        // dd($CartItem);

        // Si el carrito no existe, retorna un error 404
        if ($CartItem) {
            $CartItem->delete();
            return response()->json(['message' => 'Producto eliminado'], 200);
        }
        return response()->json(['message' => 'No encontrado'], 404);
    }
}
