import type { ChangeEvent } from 'react';

// Reutilizamos una estructura genérica para que funcione con cualquier formulario
interface FieldProps<T> {
  label: string;
  name: keyof T;
  form: T;
  errors: Partial<Record<keyof T, string>>;
  darkMode: boolean;
  onChange: (name: keyof T, value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

export function Field<T>({
  label,
  name,
  form,
  errors,
  darkMode,
  onChange,
  type = 'text',
  placeholder = '',
  required = true,
}: FieldProps<T>) {
  return (
    <div>
      <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
        {label}
        {required && ' *'}
      </label>
      <input
        type={type}
        value={form[name] as string}
        onFocus={() => console.log("focus", String(name))}
        onBlur={() => console.log("blur", String(name))}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${
          errors[name]
            ? 'border-red-400'
            : darkMode
            ? 'border-white/20 focus:border-white bg-transparent text-white'
            : 'border-black/20 focus:border-black text-black'
        }`}
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name] as string}</p>}
    </div>
  );
}