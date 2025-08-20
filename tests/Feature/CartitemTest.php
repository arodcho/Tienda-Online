<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use App\Models\CartItem;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;

class CartitemTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function add_to_cart()
    {
        // Crea un usuario y un producto para la prueba
        $user = User::factory()->create();
        $product = Product::factory()->create();

        // Crea un token JWT para el usuario
        $token = JWTAuth::fromUser($user);

        // Realiza una solicitud para agregar el producto al carrito
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->getJson("/cartadd/{$product->id}");

        // Verifica que la respuesta sea exitosa y que el producto se haya agregado al carrito
        $response->assertStatus(201);
        $this->assertDatabaseHas('cart_items', [
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);
    }

    #[Test]
    public function list_cart_items()
    {
        // Crea un usuario, un producto y un elemento del carrito
        $user = User::factory()->create();
        $product = Product::factory()->create();

        // Crea un elemento del carrito asociado al usuario y al producto
        CartItem::factory()->create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'quantity' => 2,
        ]);

        // Crea un token JWT para el usuario
        $token = JWTAuth::fromUser($user);

        // Realiza una solicitud para obtener los elementos del carrito
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->getJson('/cart');

        // Verifica que la respuesta sea exitosa y que contenga el elemento del carrito
        $response->assertStatus(200)
            ->assertJsonFragment([
                'product_id' => $product->id,
                'quantity' => 2,
            ]);
    }

    #[Test]
    public function remove_from_cart()
    {
        // Crea un usuario, un producto y un elemento del carrito
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $cartItem = CartItem::factory()->create([
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);

        // Crea un token JWT para el usuario
        $token = JWTAuth::fromUser($user);

        // Realiza una solicitud para eliminar el elemento del carrito
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->getJson('/cartdelet/' . $cartItem->id);

        // Verifica que la respuesta sea exitosa y que el elemento del carrito haya sido eliminado
        $response->assertStatus(200);
        $this->assertDatabaseMissing('cart_items', [
            'id' => $cartItem->id,
        ]);
    }
}
