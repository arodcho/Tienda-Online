<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\OrderItem;

class OrdersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
                $order = Order::create([
            'user_id' => 1,
            'total' => 59.98,
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => 1,
            'quantity' => 2,
            'price' => 19.99,
        ]);

        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => 3,
            'quantity' => 1,
            'price' => 19.99,
        ]);
    }
}
