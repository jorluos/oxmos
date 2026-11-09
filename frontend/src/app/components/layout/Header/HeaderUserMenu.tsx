import React from 'react';
import type { User } from '../../../types';

interface HeaderUserMenuProps {
  currentUser: User;
  darkMode: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onProfile: () => void;
  onLogout: () => void;
}

export function HeaderUserMenu({
  currentUser,
  darkMode,
  isOpen,
  onProfile,
  onLogout,
}: HeaderUserMenuProps) {
  if (!isOpen) return null;

  return (
    <div
      className={`absolute right-0 top-full mt-1 border shadow-lg w-44 py-1 z-50 ${
        darkMode ? 'bg-black border-white/10' : 'bg-white border-black/10'
      }`}
    >
      <div className={`px-3 py-2 border-b ${darkMode ? 'border-white/5' : 'border-black/5'}`}>
        <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-black/50'}`}>Hola,</p>
        <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-black'}`}>
          {currentUser.first_name} {currentUser.last_name}
        </p>
      </div>
      <button
        onClick={onProfile}
        className={`w-full text-left px-3 py-2 text-sm transition-colors ${
          darkMode ? 'hover:bg-white/5 text-white' : 'hover:bg-black/5 text-black'
        }`}
      >
        Mi perfil
      </button>
      <button
        onClick={onLogout}
        className={`w-full text-left px-3 py-2 text-sm transition-colors ${
          darkMode ? 'hover:bg-white/5 text-white' : 'hover:bg-black/5 text-black'
        }`}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
