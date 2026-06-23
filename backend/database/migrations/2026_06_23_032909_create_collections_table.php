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
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Nombre de la colección
            $table->string('slug')->unique(); // Slug único para la colección, útil para URLs amigables
            $table->text('description')->nullable();  // Descripción de la colección (opcional)
            $table->boolean('is_active')->default(true);  // Indica si la colección está activa o no
            $table->timestamp('starts_at')->nullable();  // Fecha de inicio de la colección (opcional)
            $table->timestamp('ends_at')->nullable();  // Fecha de finalización de la colección (opcional)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collections');
    }
};
