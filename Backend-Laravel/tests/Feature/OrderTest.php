<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\CartItem;
use App\Models\Order;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function can_confirm_order()
    {
        // Crear usuario y token JWT
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        // Crear producto
        $product = Product::factory()->create(['stock' => 10, 'price' => 50]);

        // Añadir producto al carrito
        CartItem::create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'quantity' => 2,
        ]);

        // Llamar al endpoint POST /checkout
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token"
        ])->postJson('/checkout');

        // Comprobar que la respuesta es correcta
        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'order' => [
                    'id',
                    'user_id',
                    'total',
                    'items' => [
                        ['id', 'product_id', 'quantity', 'price']
                    ]
                ]
            ]);

        // Comprobar que el stock se ha reducido
        $this->assertEquals(8, $product->fresh()->stock);

        // Comprobar que el carrito se ha vaciado
        $this->assertDatabaseMissing('cart_items', ['user_id' => $user->id]);
    }
    

    #[Test]
    public function can_view_order_history()
    {
        // Crear usuario y token JWT
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        // Crear orden con items
        $order = Order::factory()->for($user)->create();
        $product = Product::factory()->create();
        $order->items()->create([
            'product_id' => $product->id,
            'quantity' => 1,
            'price' => $product->price
        ]);

        // Llamar al endpoint GET /orders
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token"
        ])->getJson('/orders');

        // Comprobar que la respuesta es correcta
        $response->assertStatus(200)
            ->assertJsonFragment([
                'id' => $order->id,
                'user_id' => $user->id
            ])
            ->assertJsonStructure([
                '*' => [
                    'id',
                    'user_id',
                    'total',
                    'items' => [
                        ['id', 'product_id', 'quantity', 'price', 'product']
                    ]
                ]
            ]);
    }
}
