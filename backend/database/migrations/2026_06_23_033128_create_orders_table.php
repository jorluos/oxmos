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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();  // ID del usuario que realizó el pedido
            $table->foreignId('address_id')->nullable()->constrained('addresses')->nullOnDelete();  // ID de la dirección de envío
            $table->string('order_number')->unique();  // Número único para el pedido
            $table->string('status')->default('pending');  // Estado del pedido
            $table->string('currency', 3)->default('COP');  // Moneda del pedido
            $table->string('customer_name');  // Nombre del cliente
            $table->string('customer_phone');  // Teléfono del cliente
            $table->string('customer_email');  // Email del cliente
            $table->text('shipping_address_text');  // Dirección de envío en formato de texto (para guardar la dirección completa en el momento del pedido)
            $table->text('notes')->nullable();  // Notas adicionales del cliente para el pedido (opcional)
            $table->decimal('subtotal', 12, 2);  // Subtotal del pedido antes de impuestos, descuentos y envío
            $table->decimal('discount_total', 12, 2)->default(0);  //  Total de descuentos aplicados al pedido
            $table->decimal('shipping_total', 12, 2)->default(0);  //  Costo de envío del pedido
            $table->decimal('tax_total', 12, 2)->default(0);  // Total de impuestos aplicados al pedido
            $table->decimal('total', 12, 2);  // Total final del pedido después de impuestos, descuentos y envío
            $table->string('payment_status')->default('pending');  // Estado del pago del pedido
            $table->string('payment_method')->nullable();  // Método de pago utilizado para el pedido (opcional)
            $table->timestamp('placed_at')->nullable();  // Fecha y hora en que se realizó el pedido
            $table->index('status');  // Índice para el estado del pedido para mejorar las consultas
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
