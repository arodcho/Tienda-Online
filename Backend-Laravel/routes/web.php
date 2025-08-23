<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\OrderController;

/**
 * Ruta para obtener el token CSRF
 * Útil para aplicaciones frontend que necesitan este token para solicitudes POST, PUT, DELETE.
 */
Route::get('/csrf-token', function () {
    return response()->json([
        'csrf_token' => csrf_token()
    ]);
});

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
    // Obtener items del carrito
    Route::get('/cart', [CartItemController::class, 'index']);
    // Agregar producto al carrito 
    Route::post('/cartadd', [CartItemController::class, 'store']);
    // Eliminar un item del carrito por ID
    Route::delete('/cart/{id}', [CartItemController::class, 'destroy']);


    /**
     * Rutas de pedidos
     */
    // Confirmar checkout
    Route::post('/checkout', [OrderController::class, 'confirm']);
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
