<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\GoogleAuthController;

Route::get('/', function () {
    return view('dashboard');
});

// Rutas de autenticación con Google
Route::prefix('auth')->group(function () {
    Route::get('google/redirect', [GoogleAuthController::class, 'redirectToGoogle']);
    Route::get('google/callback', [GoogleAuthController::class, 'handleGoogleCallback']);
});
