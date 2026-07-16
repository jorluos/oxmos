// Field.tsx
import React from 'react';
import { useApp } from '../context/AppContext';

interface FieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
}

export const Field: React.FC<FieldProps> = ({ label, name, type = 'text', placeholder, value, error, onChange }) => {
    const { darkMode } = useApp();

    return (
      <div>
        <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/55' : 'text-black/50'}`}>{label} *</label>
        <input
          type={type}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${
            error
              ? 'border-red-400'
              : darkMode
              ? 'border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus:border-white/30'
              : 'border-black/15 bg-white text-black placeholder:text-black/35 focus:border-black'
          }`}
          name={name}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    );
};
