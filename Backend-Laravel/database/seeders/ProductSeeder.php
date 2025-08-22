<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Camiseta Azul',
                'description' => 'Camiseta de algodón, talla M',
                'price' => 19.99,
                'stock' => 50,
                'image' => 'img/camiseta.webp',
            ],
            [
                'name' => 'Zapatillas Running',
                'description' => 'Zapatillas deportivas para correr',
                'price' => 59.99,
                'stock' => 30,
                'image' => 'img/zapatilla.webp',
            ],
            [
                'name' => 'Mochila Escolar',
                'description' => 'Mochila resistente con varios compartimentos',
                'price' => 39.99,
                'stock' => 20,
                'image' => 'img/mochila.webp',
            ],
            [
                'name' => 'Auriculares Inalámbricos',
                'description' => 'Auriculares bluetooth con cancelación de ruido',
                'price' => 79.99,
                'stock' => 15,
                'image' => 'img/auriculares.webp',
            ],
            [
                'name' => 'Reloj Inteligente',
                'description' => 'Reloj con monitor de actividad y notificaciones',
                'price' => 129.99,
                'stock' => 0,
                'image' => 'img/reloj.webp',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
