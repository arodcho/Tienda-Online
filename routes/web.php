<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\OrderController;

// Ruta principal
Route::get('/', function () {
    return view('dashboard');
});

// Rutas de productos
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Requiere autenticación
Route::middleware(['auth:api'])->group(function () {
    // Rutas del carrito
    Route::get('/cart', [CartItemController::class, 'index']);
    Route::get('/cartdelet/{id}', [CartItemController::class, 'destroy']);
    Route::get('/cartadd/{id}', [CartItemController::class, 'store']);

    // Rutas de pedidos
    Route::get('/checkout', [OrderController::class, 'confirm']);
    Route::get('/orders', [OrderController::class, 'index']);

});

// Rutas de autenticación con Google
Route::prefix('auth')->group(function () {
    Route::get('google/redirect', [GoogleAuthController::class, 'redirectToGoogle']);
    Route::get('google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);
});
