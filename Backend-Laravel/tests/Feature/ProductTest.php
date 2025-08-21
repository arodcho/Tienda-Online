<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;


class ProductTest extends TestCase
{
    use RefreshDatabase;

     #[Test]
    public function test_all_products()
    {
        // Crear 5 productos usando el factory
        $products = Product::factory()->count(5)->create();

        // Hacer una solicitud GET a la ruta de productos
        $response = $this->getJson('/products');

        // Verificar que la respuesta sea exitosa y contenga los 5 productos
        $response->assertStatus(200)
            ->assertJsonCount(5);  // debe haber 5 productos
    }

       #[Test]
    public function test_show_product()
    {
        // Crear un producto usando el factory
        $product = Product::factory()->create();

        // Hacer una solicitud GET a la ruta de un producto específico
        $response = $this->getJson("/products/{$product->id}");

        // Verificar que la respuesta sea exitosa y contenga los datos del producto
        $response->assertStatus(200)
            ->assertJson([
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'stock' => $product->stock,
                'description' => $product->description,
                'image' => $product->image,
            ]);
    }
}
