<?php

// This migration creates the pivot table that links products to collections. One product may belong to several commercial
// groupings at the same time, such as "Nuevo" and "Tendencia" 

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
        Schema::create('collection_product', function (Blueprint $table) {
            $table->id();
            $table->foreignId('collection_id')->constrained('collections')->onDelete('cascade');  // Relación con la tabla de colecciones, eliminando en cascada si se elimina una colección
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');  // Relación con la tabla de productos, eliminando en cascada si se elimina un producto
            $table->unique(['collection_id', 'product_id']);  // Asegura que no se puedan duplicar las relaciones entre colecciones y productos
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collection_product');
    }
};
