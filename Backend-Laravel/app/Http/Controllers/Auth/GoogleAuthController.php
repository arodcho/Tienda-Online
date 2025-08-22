<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

/**
 * Controlador para la autenticación con Google mediante OAuth.
 */
class GoogleAuthController extends Controller
{
    /**
     * Redirige al usuario a Google para iniciar sesión.
     *
     * @return \Illuminate\Http\Response Redirección a Google OAuth
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Maneja la respuesta de Google después de la autenticación.
     * Crea o obtiene el usuario en la base de datos y genera un token JWT.
     * Redirige al frontend con token, nombre de usuario e ID.
     * Contiene dd() para depuración.
     *
     * @return \Illuminate\Http\RedirectResponse Redirección al frontend con credenciales
     */
    public function handleGoogleCallback()
    {
        // Obtener la información del usuario desde Google
        $googleUser = Socialite::driver('google')->stateless()->user();
        dd($googleUser); // Depuración: muestra los datos devueltos por Google

        // Crear usuario si no existe, usando email como clave
        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'password' => bcrypt(uniqid()) // Contraseña aleatoria
            ]
        );
        dd($user); // Depuración: muestra el usuario en la base de datos

        $userId = $user->id;

        // Generar token JWT para el usuario autenticado
        $token = JWTAuth::fromUser($user);
        dd($token); // Depuración: muestra el token JWT

        // Redirigir al frontend con token, nombre e ID del usuario
        return redirect(
            'http://localhost:3000/login-success?token=' . $token . 
            '&user=' . $user->name . 
            '&id=' . $userId
        );
    }
}
