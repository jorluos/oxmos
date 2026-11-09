import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Field } from './CheckoutField';
import type { CheckoutFormState, CheckoutErrors } from './useCheckout';

interface CheckoutFormProps {
  form: CheckoutFormState;
  errors: CheckoutErrors;
  darkMode: boolean;
  onChange: (name: keyof CheckoutFormState, value: string) => void;
  onSubmit: () => void;
  onNotasChange: (val: string) => void;
}

export function CheckoutForm({
  form,
  errors,
  darkMode,
  onChange,
  onSubmit,
  onNotasChange,
}: CheckoutFormProps) {
  return (
    <div className="space-y-6">
      <h3 className={`border-b pb-3 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
        Datos de contacto
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nombres" name="nombres" form={form} errors={errors} darkMode={darkMode} onChange={onChange} />
        <Field label="Apellidos" name="apellidos" form={form} errors={errors} darkMode={darkMode} onChange={onChange} />
        <Field label="Número de cédula" name="cedula" form={form} errors={errors} darkMode={darkMode} onChange={onChange} />
        <Field label="Teléfono / WhatsApp" name="telefono" type="tel" form={form} errors={errors} darkMode={darkMode} onChange={onChange} />
        <div className="sm:col-span-2">
          <Field label="Correo electrónico" name="correo" type="email" form={form} errors={errors} darkMode={darkMode} onChange={onChange} />
        </div>
      </div>

      <h3 className={`border-b pb-3 pt-2 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
        Dirección de entrega
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Field label="Dirección completa" name="direccion" form={form} errors={errors} darkMode={darkMode} onChange={onChange} />
        </div>
        <div className="sm:col-span-2">
          <Field label="Ciudad / Municipio" name="ciudad" form={form} errors={errors} darkMode={darkMode} onChange={onChange} />
        </div>
      </div>

      <div>
        <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
          Notas adicionales
        </label>
        <textarea
          value={form.notas}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onNotasChange(e.target.value)}
          placeholder="Instrucciones especiales de entrega, apartamento, etc."
          rows={3}
          className={`w-full border px-4 py-3 text-sm outline-none resize-none transition-colors ${
            darkMode
              ? 'border-white/20 focus:border-white bg-transparent text-white placeholder:text-white/30'
              : 'border-black/20 focus:border-black text-black placeholder:text-black/30'
          }`}
        />
      </div>

      <div className={`border p-4 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-black/3 border-black/10'}`}>
        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
          🔒 Tus datos están seguros. Solo los usamos para procesar tu pedido.
        </p>
      </div>

      <button
        onClick={onSubmit}
        className={`w-full py-4 text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
          darkMode ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-black/80'
        }`}
      >
        Revisar pedido <ArrowRight size={16} />
      </button>
    </div>
  );
}
