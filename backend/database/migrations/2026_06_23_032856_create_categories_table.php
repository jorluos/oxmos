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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->nullable()->constrained('categories')->onDelete('cascade'); // Relación con la categoría padre (si es una subcategoría)
            $table->string('name'); // Nombre de la categoría
            $table->string('slug')->unique(); // Slug único para la categoría, útil para URLs amigables
            $table->text('description')->nullable(); // Descripción de la categoría (opcional)
            $table->boolean('is_active')->default(true); // Indica si la categoría está activa o no
            $table->integer('sort_order')->default(0); // Orden de clasificación para mostrar categorías en un orden específico
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
