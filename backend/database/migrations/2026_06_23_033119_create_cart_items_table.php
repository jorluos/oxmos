<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained('carts')->onDelete('cascade');  // ID del carrito al que pertenece el ítem
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');  // ID del producto
            $table->foreignId('product_variant_id')->constrained('product_variants')->onDelete('cascade');  // ID de la variante del producto
            $table->integer('quantity')->default(1);  // Cantidad de unidades del producto en el carrito
            $table->decimal('unit_price', 12, 2);  // Precio unitario del producto en el momento de agregarlo al carrito
            $table->unique(['cart_id', 'product_variant_id']);  // Asegura que no haya duplicados de la misma variante de producto en el mismo carrito
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
