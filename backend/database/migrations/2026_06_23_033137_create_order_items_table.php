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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();  // ID del pedido al que pertenece el ítem
            $table->foreignId('product_id')->constrained('products');  // ID del producto
            $table->foreignId('product_variant_id')->nullable()->constrained('product_variants')->nullOnDelete();  // ID de la variante del producto
            $table->string('sku_snapshot')->nullable();  // Instantánea del SKU del producto
            $table->string('product_name_snapshot');  // Instantánea del nombre del producto
            $table->string('variant_description_snapshot')->nullable();  // Instantánea de la descripción de la variante
            $table->unsignedInteger('quantity');  // Cantidad de unidades del producto en el pedido
            $table->decimal('unit_price', 12, 2);  // Precio unitario del producto en el momento de agregarlo al pedido
            $table->decimal('subtotal', 12, 2);  // Subtotal del ítem en el pedido
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
