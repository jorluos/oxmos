import React from 'react';
import type { CheckoutFormState } from './useCheckout';

interface CheckoutConfirmationProps {
  form: CheckoutFormState;
  darkMode: boolean;
  onEdit: () => void;
  onConfirm: () => void;
}

export function CheckoutConfirmation({
  form,
  darkMode,
  onEdit,
  onConfirm,
}: CheckoutConfirmationProps) {
  return (
    <div className="space-y-5">
      <h3 className={`border-b pb-3 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
        Confirmar pedido
      </h3>
      <div className={`border p-4 space-y-1.5 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-black/3 border-black/10'}`}>
        <p className={`text-sm ${darkMode ? 'text-white' : 'text-black'}`}>
          <strong>{form.nombres} {form.apellidos}</strong>
        </p>
        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
          📱 {form.telefono} · ✉️ {form.correo}
        </p>
        <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
          📍 {form.direccion}, {form.ciudad}
        </p>
        {form.notas && (
          <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
            📝 {form.notas}
          </p>
        )}
      </div>

      <div className={`border p-4 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
        <p className={`text-xs tracking-widest uppercase mb-3 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
          Método de pago
        </p>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 flex items-center justify-center text-xl ${darkMode ? 'bg-white/10' : 'bg-black/5'}`}>
            💳
          </div>
          <div>
            <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
              Pago contra entrega
            </p>
            <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
              Pagas en efectivo o con datafono cuando recibes tu pedido
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onEdit}
          className={`flex-1 border py-3 text-sm transition-colors ${
            darkMode
              ? 'border-white/20 hover:border-white text-white'
              : 'border-black/20 hover:border-black text-black'
          }`}
        >
          Editar datos
        </button>
        <button
          onClick={onConfirm}
          className={`flex-1 py-3 text-sm tracking-widest uppercase transition-colors ${
            darkMode
              ? 'bg-white text-black hover:bg-white/80'
              : 'bg-black text-white hover:bg-black/80'
          }`}
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  );
}
