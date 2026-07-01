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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->string('sku', 50)->unique();  // Código único para la variante del producto
            $table->string('barcode', 50)->nullable();  // Código de barras (opcional)
            $table->string('size', 50);  // Tamaño de la variante
            $table->string('color_name', 50);  // Color de la variante
            $table->string('color_hex', 7)->nullable();  // Código hexadecimal del color (opcional)
            $table->decimal('price', 12, 2);  // Precio de la variante
            $table->decimal('compare_at_price', 12, 2)->nullable();  // Precio de comparación (opcional)
            $table->integer('stock')->default(0);  // Cantidad en stock de la variante
            $table->integer('reserved_stock')->default(0);  // Cantidad de stock reservada para pedidos pendientes
            $table->integer('weight')->nullable();  // Peso de la variante (opcional)
            $table->boolean('is_active')->default(true);  // Indica si la variante está activa o no
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
