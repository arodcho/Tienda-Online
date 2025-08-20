<?php

namespace App\Http\Controllers;


use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Support\Facades\DB;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class OrderController extends Controller
{
    public function confirm()
    {
        $user = JWTAuth::parseToken()->authenticate(); // Obtiene el usuario del token

        // dd($user);

        // Traer carrito del usuario
        $cartItems = CartItem::with('product')->where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'El carrito está vacío'], 400);
        }

        DB::beginTransaction(); 
        try {
            $total = $cartItems->sum(function($item) {
                return $item->product->price * $item->quantity;
            });

            // Crear la orden
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total
            ]);

            foreach ($cartItems as $item) {
                // Verificar stock
                if ($item->product->stock < $item->quantity) {
                    throw new \Exception("No hay stock suficiente de {$item->product->name}");
                }

                // Restar stock
                $item->product->decrement('stock', $item->quantity);

                // Guardar item de pedido
                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $item->product_id,
                    'quantity'   => $item->quantity,
                    'price'      => $item->product->price
                ]);
            }

            // Vaciar carrito
            CartItem::where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json([
                'message' => 'Compra confirmada',
                'order'   => $order->load('items.product')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
