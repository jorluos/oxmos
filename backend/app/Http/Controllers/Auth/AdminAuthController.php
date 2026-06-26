<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class AdminAuthController extends Controller
{
    /**
     * Login de admin solo con contraseña.
     */
    public function login(Request $request): JsonResponse
{
    $request->validate(['password' => 'required|string']);

    $user = User::where('role_id', 1)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'password' => ['Contraseña incorrecta.'],
        ]);
    }

    // Iniciar sesión (Sanctum usa guard 'web' para cookies)
    Auth::guard('web')->login($user);

    return response()->json([
        'success' => true,
        'user'    => $user,
    ]);
}

    /**
     * Logout (Cierra sesion con cookies).
     */
    public function logout(Request $request): JsonResponse
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada correctamente.',
        ]);
    }

    /**
     * Obtener datos del admin autenticado.
     */
    public function me(Request $request): JsonResponse
    {
        $user = Auth::guard('web')->user();

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'No hay un usuario autenticado.',
            ], 401);
        }

        $user->load('role'); // Cargar la relación del rol si es necesario

        return response()->json([
            'success' => true,
            'user'    => $user,
        ]);
    }
}