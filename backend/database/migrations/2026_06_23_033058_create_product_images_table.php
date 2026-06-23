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
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('product_variant_id')->constrained('product_variants')->onDelete('cascade');
            $table->string('image_url');  // URL de la imagen del producto
            $table->string('alt_text')->nullable();  // Texto alternativo para la imagen (opcional) Accesibilidad y SEO
            $table->integer('position')->default(0);  // Posición de la imagen en la galería del producto
            $table->boolean('is_primary')->default(false);  // Indica si esta imagen es la imagen principal del producto
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_images');
    }
};
