<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Obtener el carrito del usuario autenticado con sus items.
     */
    public function index(Request $request)
    {
        $cart = Cart::firstOrCreate(
            ['user_id' => $request->user()->id, 'status' => 'active'],
            ['expires_at' => now()->addDays(7)]
        );

        $cart->load('items.product.images', 'items.productVariant');

        return response()->json([
            'cart' => $cart,
            'items' => $cart->items,
        ]);
    }

    /**
     * Agregar un item al carrito.
     */
    public function addItem(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_variant_id' => 'required|exists:product_variants,id',
            'quantity' => 'required|integer|min:1|max:99',
        ]);

        $variant = ProductVariant::findOrFail($validated['product_variant_id']);

        if ($variant->stock < $validated['quantity']) {
            return response()->json(['message' => 'Stock insuficiente'], 422);
        }

        $cart = Cart::firstOrCreate(
            ['user_id' => $request->user()->id, 'status' => 'active'],
            ['expires_at' => now()->addDays(7)]
        );

        $existing = $cart->items()
            ->where('product_variant_id', $validated['product_variant_id'])
            ->first();

        if ($existing) {
            $existing->update([
                'quantity' => $existing->quantity + $validated['quantity'],
            ]);
            $item = $existing;
        } else {
            $item = $cart->items()->create([
                'product_id' => $validated['product_id'],
                'product_variant_id' => $validated['product_variant_id'],
                'quantity' => $validated['quantity'],
                'unit_price' => $variant->price,
            ]);
        }

        $item->load('product.images', 'productVariant');

        $cart->load('items.product.images', 'items.productVariant');

        return response()->json([
            'cart' => $cart,
            'item' => $item,
        ], 201);
    }

    /**
     * Eliminar un item del carrito.
     */
    public function removeItem(Request $request, CartItem $item)
    {
        if ($item->cart->user_id !== $request->user()->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $item->delete();

        return response()->json(['message' => 'Item eliminado']);
    }

    /**
     * Actualizar cantidad de un item.
     */
    public function updateQuantity(Request $request, CartItem $item)
    {
        if ($item->cart->user_id !== $request->user()->id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1|max:99',
        ]);

        $variant = $item->productVariant;
        if ($variant && $variant->stock < $validated['quantity']) {
            return response()->json(['message' => 'Stock insuficiente'], 422);
        }

        $item->update(['quantity' => $validated['quantity']]);

        return response()->json(['message' => 'Cantidad actualizada', 'item' => $item]);
    }

    /**
     * Vaciar el carrito.
     */
    public function clear(Request $request)
    {
        $cart = Cart::where('user_id', $request->user()->id)
            ->where('status', 'active')
            ->first();

        if ($cart) {
            $cart->items()->delete();
            $cart->delete();
        }

        return response()->json(['message' => 'Carrito vaciado']);
    }
}