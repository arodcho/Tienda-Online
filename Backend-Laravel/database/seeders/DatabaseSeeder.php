<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Llamamos a todos los seeders necesarios
        $this->call([
            ProductSeeder::class,
            UserSeeder::class,
            CartItemSeeder::class,
            OrdersSeeder::class,
        ]);
    }
}
