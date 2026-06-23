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
        Schema::create('wishlist_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('wishlist_id')->constrained('wishlists')->cascadeOnDelete();  // ID de la lista de deseos a la que pertenece el ítem
            $table->foreignId('product_id')->constrained('products');  // ID del producto
            $table->unique(['wishlist_id', 'product_id']);  // Asegura que un producto no se pueda agregar más de una vez a la misma lista de deseos
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wishlist_items');
    }
};
