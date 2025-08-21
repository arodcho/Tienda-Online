<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class GoogleAuthController extends Controller
{
    // Redirigir al usuario a Google para autenticación
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    // Manejar la respuesta de Google después de la autenticación
    public function handleGoogleCallback()
    {

        $googleUser = Socialite::driver('google')->stateless()->user();
        // dd($googleUser); 

        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'password' => bcrypt(uniqid()) // Generar una contraseña aleatoria
            ]
        );
        // dd($user);

        $userId = $user->id;

        // Generar un token JWT para el usuario autenticado
        $token = JWTAuth::fromUser($user); // Genera token con JWT

        // dd($token);

        // Redirigir al usuario a la página de inicio con el token, nombre del usuario e ID del usuario
       return redirect('/?token=' . $token . '&user=' . $user->name . '&id=' . $userId);
    }
}
