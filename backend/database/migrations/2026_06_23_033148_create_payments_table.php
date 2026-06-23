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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();  // ID del pedido al que pertenece el pago
            $table->string('method');  // Método de pago
            $table->string('provider')->nullable();  // Proveedor del método de pago
            $table->string('transaction_id')->nullable();  // ID de la transacción del pago
            $table->string('status')->default('pending');  // Estado del pago
            $table->decimal('amount', 12, 2);  // Monto del pago
            $table->string('currency', 3)->default('COP');  // Moneda del pago
            $table->timestamp('paid_at')->nullable();  // Fecha y hora en que se realizó el pago
            $table->json('raw_response')->nullable();  // Respuesta cruda del proveedor de pago (opcional, para almacenar información adicional)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
