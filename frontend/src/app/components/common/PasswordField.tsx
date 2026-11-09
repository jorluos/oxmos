import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PasswordFieldProps {
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showToggle?: boolean;
  showPw?: boolean;
  onToggleShowPw?: () => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  value,
  error,
  onChange,
  placeholder,
  showToggle = false,
  showPw = false,
  onToggleShowPw,
}) => {
  const { darkMode } = useApp();

  return (
    <div>
      <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/55' : 'text-black/50'}`}>
        {label} *
      </label>
      <div className="relative">
        <input
          type={showToggle ? (showPw ? 'text' : 'password') : 'password'}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full border px-4 py-3 text-sm outline-none ${
            showToggle ? 'pr-12' : ''
          } transition-colors ${
            error
              ? 'border-red-400'
              : darkMode
              ? 'border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus:border-white/30'
              : 'border-black/15 bg-white text-black placeholder:text-black/35 focus:border-black'
          }`}
        />
        {showToggle && onToggleShowPw && (
          <button
            type="button"
            onClick={onToggleShowPw}
            className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
              darkMode ? 'text-white/35 hover:text-white/70' : 'text-black/30 hover:text-black/60'
            }`}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
