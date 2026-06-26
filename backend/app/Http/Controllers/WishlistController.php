<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use App\Models\WishlistItem;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    /**
     * Obtener la wishlist del usuario autenticado.
     */
    public function index(Request $request)
    {
        $wishlist = Wishlist::firstOrCreate(
            ['user_id' => $request->user()->id]
        );

        $wishlist->load('items.product.images', 'items.product.variants');

        return response()->json([
            'wishlist' => $wishlist,
            'items' => $wishlist->items,
        ]);
    }

    /**
     * Agregar un producto a la wishlist.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $wishlist = Wishlist::firstOrCreate(
            ['user_id' => $request->user()->id]
        );

        $exists = $wishlist->items()
            ->where('product_id', $validated['product_id'])
            ->exists();

        if ($exists) {
            return response()->json(['message' => 'El producto ya está en favoritos'], 409);
        }

        $item = $wishlist->items()->create([
            'product_id' => $validated['product_id'],
        ]);

        $item->load('product.images');

        return response()->json(['item' => $item], 201);
    }

    /**
     * Eliminar un producto de la wishlist.
     */
    public function destroy(Request $request, $productId)
    {
        $wishlist = Wishlist::where('user_id', $request->user()->id)->first();

        if (!$wishlist) {
            return response()->json(['message' => 'No hay wishlist'], 404);
        }

        $deleted = $wishlist->items()
            ->where('product_id', $productId)
            ->delete();

        if ($deleted === 0) {
            return response()->json(['message' => 'Producto no encontrado en favoritos'], 404);
        }

        return response()->json(['message' => 'Producto eliminado de favoritos']);
    }
}