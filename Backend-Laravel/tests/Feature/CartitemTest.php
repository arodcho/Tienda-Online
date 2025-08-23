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

    /**
     * Test para agregar un producto al carrito del usuario autenticado.
     * Verifica que el producto se agregue correctamente en la base de datos.
     */
    #[Test]
    public function add_to_cart()
    {
        // Crear usuario y token JWT
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $token = JWTAuth::fromUser($user);

        // Realizar petición POST al endpoint /cartadd
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->postJson('/cartadd', [
            'product_id' => $product->id
        ]);

        // Verificar que la respuesta sea 201 (creado)
        $response->assertStatus(201);

        // Verificar que el item se encuentre en la base de datos
        $this->assertDatabaseHas('cart_items', [
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);
    }

    /**
     * Test para listar los items del carrito del usuario autenticado.
     * Verifica que la respuesta incluya correctamente los productos del carrito.
     */
    #[Test]
    public function list_cart_items()
    {
        // Crear usuario, producto y agregar item al carrito
        $user = User::factory()->create();
        $product = Product::factory()->create();

        CartItem::factory()->create([
            'user_id' => $user->id,
            'product_id' => $product->id,
            'quantity' => 2,
        ]);

        $token = JWTAuth::fromUser($user);

        // Realizar petición GET al endpoint /cart
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->getJson('/cart');

        // Verificar que la respuesta sea 200 (OK) y contenga los datos correctos
        $response->assertStatus(200)
            ->assertJsonFragment([
                'product_id' => $product->id,
                'quantity' => 2,
            ]);
    }

    /**
     * Test para eliminar un item del carrito del usuario autenticado.
     * Verifica que el item se elimine correctamente de la base de datos.
     */
    #[Test]
    public function remove_from_cart()
    {
        // Crear usuario, producto y item de carrito
        $user = User::factory()->create();
        $product = Product::factory()->create();
        $cartItem = CartItem::factory()->create([
            'user_id' => $user->id,
            'product_id' => $product->id,
        ]);

        $token = JWTAuth::fromUser($user);

        // Realizar petición DELETE al endpoint /cart/{id}
        $response = $this->withHeaders([
            'Authorization' => "Bearer $token",
        ])->deleteJson('/cart/' . $cartItem->id);

        // Verificar que la respuesta sea 200 (OK)
        $response->assertStatus(200);

        // Verificar que el item ya no exista en la base de datos
        $this->assertDatabaseMissing('cart_items', [
            'id' => $cartItem->id,
        ]);
    }
}
