<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Support\Facades\DB;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

/**
 * Controlador para manejar órdenes de compra.
 * Permite consultar historial de compras y confirmar checkout.
 */
class OrderController extends Controller
{
    /**
     * Mostrar historial de compras del usuario autenticado.
     *
     * @return \Illuminate\Http\JsonResponse Lista de órdenes con sus items y productos
     */
    public function index()
    {
        $user = JWTAuth::parseToken()->authenticate(); 
        //dd($user); Depuración: muestra el usuario autenticado

        // Trae todas las órdenes del usuario con sus items y productos
        $orders = Order::with('items.product')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
        //dd($orders); Depuración: muestra las órdenes obtenidas

        return response()->json($orders, 200);
    }

    /**
     * Confirma la compra: genera la orden, decrementa stock, vacía el carrito.
     *
     * @return \Illuminate\Http\JsonResponse Mensaje de éxito y detalles de la orden, o error
     */
    public function confirm()
    {
        $user = JWTAuth::parseToken()->authenticate(); 
        // dd($user); // Depuración: muestra el usuario autenticado

        // Traer carrito del usuario
        $cartItems = CartItem::with('product')->where('user_id', $user->id)->get();
        // dd($cartItems); // Depuración: muestra los items del carrito

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'El carrito está vacío'], 400);
        }

        DB::beginTransaction(); 
        try {
            // Calcular total de la orden
            $total = $cartItems->sum(function($item) {
                return $item->product->price * $item->quantity;
            });

            // Crear la orden
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total
            ]);
            // dd($order); // Depuración: muestra la orden creada

            foreach ($cartItems as $item) {
                // Verificar stock disponible
                if ($item->product->stock < $item->quantity) {
                    throw new \Exception("No hay stock suficiente de {$item->product->name}");
                }

                // Restar stock del producto
                $item->product->decrement('stock', $item->quantity);

                // Guardar item de pedido
                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $item->product_id,
                    'quantity'   => $item->quantity,
                    'price'      => $item->product->price
                ]);
                // dd($orderItem); // Depuración: muestra el item de la orden creado
            }

            // Vaciar carrito del usuario
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
