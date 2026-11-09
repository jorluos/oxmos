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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->cascadeOnDelete();  // ID del producto
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();  // ID del usuario que realiza la reseña
            $table->foreignId('order_id')->nullable()->constrained('orders')->nullOnDelete();  // ID del pedido asociado a la reseña (opcional)
            $table->tinyInteger('rating')->unsigned()->default(5);  // Calificación de la reseña (1 a 5)
            $table->string('title', 255);  // Título de la reseña
            $table->text('comment')->nullable();  // Contenido de la reseña
            $table->boolean('is_approved')->default(false);  // Indica si la reseña ha sido aprobada por un administrador
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
