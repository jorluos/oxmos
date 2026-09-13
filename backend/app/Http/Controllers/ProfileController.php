<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /**
     * Devuelve los datos del usuario autenticado (con su dirección principal).
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user()->load('addresses');

        return response()->json([
            'success' => true,
            'data' => $user,
        ]);
    }

    /**
     * Actualiza nombre, apellido, teléfono y dirección del usuario autenticado.
     *
     * La dirección se guarda en la tabla `addresses`, sobre la dirección
     * marcada como envío por defecto (o la primera que exista). Si el
     * usuario no tiene ninguna, se crea una.
     */
    public function update(Request $request): JsonResponse
    {
        $user = $request->user();

        $validated = $request->validate([
            'first_name' => ['sometimes', 'string', 'max:100'],
            'last_name'  => ['sometimes', 'string', 'max:100'],
            'phone'      => ['sometimes', 'nullable', 'string', 'max:20'],
            'address'    => ['sometimes', 'nullable', 'string', 'max:255'],
        ]);

        $user->fill(collect($validated)->only(['first_name', 'last_name', 'phone'])->toArray());
        $user->save();

        if (array_key_exists('address', $validated) && filled($validated['address'])) {
            $address = $user->addresses()->where('is_default_shipping', true)->first()
                ?? $user->addresses()->first();

            if ($address) {
                $address->update(['street_line_1' => $validated['address']]);
            } else {
                $user->addresses()->create([
                    'label' => 'Principal',
                    'recipient_name' => trim("{$user->first_name} {$user->last_name}"),
                    'recipient_phone' => $user->phone ?? '',
                    'street_line_1' => $validated['address'],
                    'city' => '',
                    'state' => '',
                    'country' => 'Colombia',
                    'is_default_shipping' => true,
                    'is_default_billing' => true,
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'data' => $user->fresh()->load('addresses'),
        ]);
    }
}
