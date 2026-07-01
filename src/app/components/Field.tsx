// Field.tsx
import React from "react";

interface FieldProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    value: string;
    error?: string;
    onChange: (value: string) => void;
}

export const Field: React.FC<FieldProps> = ({ label, name, type = "text", placeholder, value, error, onChange }) => (
    <div>
        <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">{label} *</label>
        <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${
            error ? "border-red-400" : "border-black/20 focus:border-black"
        }`}
        />
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
);
