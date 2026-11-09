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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');  // Relación con la tabla de categorías, eliminando en cascada si se elimina una categoría
            $table->string('name');  // Nombre del producto
            $table->string('slug')->unique(); // Slug único para el producto, útil para URLs amigables
            $table->text('short_description')->nullable();  // Descripción del producto (opcional)
            $table->string('brand')->nullable();  // Marca del producto (opcional)
            $table->string('gender')->nullable();  // Género del producto (opcional)
            $table->string('type')->nullable();  // Tipo de producto (opcional)
            $table->string('material')->nullable();  // Material del producto (opcional)
            $table->text('care_instructions')->nullable();  // Instrucciones de cuidado del producto (opcional)
            $table->decimal('base_price', 12, 2);  // Precio base del producto
            $table->decimal('original_price', 12, 2)->nullable();  // Precio original del producto (opcional)
            $table->decimal('raiting_average', 3, 2)->nullable();  // Promedio de calificación del producto (opcional)
            $table->integer('reviews_count')->default(0);  // Cantidad de reseñas del producto
            $table->boolean('is_featured')->default(false);  // Indica si el producto es destacado o no
            $table->boolean('is_active')->default(true);  // Indica si el producto está activo o no
            $table->timestamp('published_at')->nullable();  // Fecha de disponibilidad del producto (opcional)
            $table->index('is_active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
