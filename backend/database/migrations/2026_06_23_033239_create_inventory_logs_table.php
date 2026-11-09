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
        Schema::create('inventory_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_variant_id')->constrained('product_variants')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();  // ID del usuario que realizó la acción (opcional)
            $table->string('action', 50);  // Acción realizada (ej. "entrada", "salida", "ajuste")
            $table->integer('quantity');  // Cantidad de unidades afectadas
            $table->integer('stock_before');  // Stock antes de la acción
            $table->integer('stock_after');  // Stock después de la acción
            $table->string('reason')->nullable();  // Razón de la acción (opcional, para ajustes de inventario)
            $table->string('notes')->nullable();  // Notas adicionales (opcional)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_logs');
    }
};
