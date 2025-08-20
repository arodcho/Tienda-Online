<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Support\Facades\DB;
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

        $CartItem = CartItem::updateOrCreate(
            ['user_id' => $userId, 'product_id' => $id],
            ['quantity' => DB::raw('quantity + 1')]
        );

        return response()->json($CartItem, 201);
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

        if ($CartItem) {
            $CartItem->delete();
            return response()->json(['message' => 'Producto eliminado'], 200);
        }

        return response()->json(['message' => 'No encontrado'], 404);
    }
}
