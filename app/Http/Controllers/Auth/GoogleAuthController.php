<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Laravel\Socialite\Facades\Socialite;

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
        // $token = JWTAuth::fromUser($user); // Prueba para generar token con JWT
        $token = substr(str_shuffle('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'), 0, 15); // Generar token aleatorio de 10 caracteres alfanuméricos

        // dd($token);

        return redirect('/?token=' . $token . '&user=' . $user->name);
    }
}
