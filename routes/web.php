<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\GoogleAuthController;

Route::get('/', function () {
    return view('dashboard');
});

// Productos
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Rutas del carrito de compras (requiere autenticación)
Route::middleware(['auth:api'])->group(function () {
    Route::get('/cart', [CartItemController::class, 'index']);
    Route::get('/cartdelet/{id}', [CartItemController::class, 'destroy']);
    Route::get('/cartadd/{id}', [CartItemController::class, 'store']);
});

// Rutas de autenticación con Google
Route::prefix('auth')->group(function () {
    Route::get('google/redirect', [GoogleAuthController::class, 'redirectToGoogle']);
    Route::get('google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);
});
