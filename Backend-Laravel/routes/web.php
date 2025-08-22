<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\OrderController;

/**
 * Ruta principal de la aplicación.
 * Muestra el dashboard o la página principal.
 */
Route::get('/', function () {
    return view('dashboard');
});

/**
 * Rutas públicas de productos
 */
// Obtener todos los productos
Route::get('/products', [ProductController::class, 'index']);
// Obtener un producto específico por ID
Route::get('/products/{id}', [ProductController::class, 'show']);

/**
 * Rutas que requieren autenticación mediante API token
 */
Route::middleware(['auth:api'])->group(function () {

    /**
     * Rutas del carrito de compras
     */
    // Obtener los items del carrito
    Route::get('/cart', [CartItemController::class, 'index']);
    // Eliminar un item del carrito por ID
    Route::get('/cartdelet/{id}', [CartItemController::class, 'destroy']);
    // Agregar un producto al carrito por ID
    Route::get('/cartadd/{id}', [CartItemController::class, 'store']);

    /**
     * Rutas de pedidos
     */
    // Confirmar checkout
    Route::get('/checkout', [OrderController::class, 'confirm']);
    // Obtener historial de órdenes
    Route::get('/orders', [OrderController::class, 'index']);
});

/**
 * Rutas de autenticación con Google
 */
Route::prefix('auth')->group(function () {
    // Redirige a Google para iniciar sesión
    Route::get('google/redirect', [GoogleAuthController::class, 'redirectToGoogle']);
    // Callback después de autenticación con Google
    Route::get('google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);
});
