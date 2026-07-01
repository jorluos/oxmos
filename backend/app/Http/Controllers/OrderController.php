<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Cart;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    /**
     * Crear una orden desde el carrito activo del usuario.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'address_id' => 'required|exists:addresses,id',
            'notes' => 'nullable|string|max:1000',
            'payment_method' => 'required|in:efectivo,tarjeta,transferencia,otros',
        ]);

        $user = $request->user();

        // Validar que la dirección pertenece al usuario
        $address = Address::where('id', $validated['address_id'])
            ->where('user_id', $user->id)
            ->firstOrFail();

        // Obtener el carrito activo
        $cart = Cart::where('user_id', $user->id)
            ->where('status', 'active')
            ->with('items.product', 'items.productVariant')
            ->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'El carrito está vacío'], 422);
        }

        // Calcular totales
        $subtotal = $cart->items->sum(fn($item) => $item->unit_price * $item->quantity);
        $shippingTotal = 0;
        $discountTotal = 0;
        $taxTotal = 0;
        $total = $subtotal + $shippingTotal + $taxTotal - $discountTotal;

        // Generar número de orden
        $orderNumber = 'ORD-' . strtoupper(Str::random(8));

        // Crear la orden
        $order = Order::create([
            'user_id' => $user->id,
            'address_id' => $address->id,
            'order_number' => $orderNumber,
            'status' => 'pendiente',
            'currency' => 'PEN',
            'customer_name' => $user->first_name . ' ' . $user->last_name,
            'customer_phone' => $user->phone,
            'customer_email' => $user->email,
            'shipping_address_text' => implode(', ', array_filter([
                $address->street_line_1,
                $address->street_line_2,
                $address->city,
                $address->state,
                $address->country,
                $address->postal_code,
            ])),
            'notes' => $validated['notes'],
            'subtotal' => $subtotal,
            'discount_total' => $discountTotal,
            'shipping_total' => $shippingTotal,
            'tax_total' => $taxTotal,
            'total' => $total,
            'payment_status' => 'pendiente',
            'payment_method' => $validated['payment_method'],
            'placed_at' => now(),
        ]);

        // Crear los items de la orden desde el carrito
        foreach ($cart->items as $cartItem) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $cartItem->product_id,
                'product_variant_id' => $cartItem->product_variant_id,
                'sku_snapshot' => $cartItem->productVariant?->sku ?? '',
                'product_name_snapshot' => $cartItem->product?->name ?? '',
                'variant_description_snapshot' => ($cartItem->productVariant?->size ?? '') . ' / ' . ($cartItem->productVariant?->color_name ?? ''),
                'quantity' => $cartItem->quantity,
                'unit_price' => $cartItem->unit_price,
                'subtotal' => $cartItem->unit_price * $cartItem->quantity,
            ]);
        }

        // Vaciar el carrito
        $cart->items()->delete();
        $cart->update(['status' => 'converted']);

        $order->load('items');

        return response()->json(['order' => $order], 201);
    }

    /**
     * Actualizar el estado de una orden (admin).
     */
    public function updateStatus(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pendiente,en_preparacion,enviado,entregado,cancelado',
        ]);

        $order->update(['status' => $validated['status']]);

        if ($validated['status'] === 'cancelado') {
            $order->update(['payment_status' => 'reembolsado']);
        }

        return response()->json(['order' => $order->fresh()]);
    }

    /**
     * Eliminar una orden (admin).
     */
    public function destroy(Order $order)
    {
        $order->items()->delete();
        $order->delete();

        return response()->json(['message' => 'Orden eliminada']);
    }
}