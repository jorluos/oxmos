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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('label', 50);  // Etiqueta para la dirección (por ejemplo, "Casa", "Trabajo")
            $table->string('recipient_name', 100);  // Nombre del destinatario
            $table->string('recipient_phone', 20);  // Teléfono del destinatario
            $table->string('street_line_1', 255);  // Dirección principal (calle, número, etc.)
            $table->string('street_line_2', 255)->nullable();  // Datos adicionales de la dirección (opcional)
            $table->string('city', 100);  // Ciudad
            $table->string('state', 100);  // Estado o provincia
            $table->string('postal_code', 20);  // Código postal
            $table->string('country', 100);  // País
            $table->string('reference', 255)->nullable();  // Referencia adicional para la dirección (opcional), direcciones extra
            $table->boolean('is_default_shipping')->default(false);  // Indica si esta es la dirección predeterminada del usuario
            $table->boolean('is_default_billing')->default(false);  // Indica si esta es la dirección de facturación predeterminada del usuario
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
