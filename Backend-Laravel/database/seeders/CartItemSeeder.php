<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\CartItem;

class CartItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
            CartItem::create([
            'user_id' => 1,
            'product_id' => 1,
            'quantity' => 2,
        ]);

        CartItem::create([
            'user_id' => 1,
            'product_id' => 3,
            'quantity' => 1,
        ]);
    }
}
