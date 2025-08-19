<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;


class GoogleAuthController extends Controller
{
    public function redirectToGoogle()
    {
        // Redirigir al usuario a Google para autenticación
        return Socialite::driver('google')->redirect();
    }

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

        // Generar un token JWT para el usuario autenticado
        $token = JWTAuth::fromUser($user); // Genera token con JWT

        // dd($token);

        return redirect('/?token=' . $token . '&user=' . $user->name);
    }
}
