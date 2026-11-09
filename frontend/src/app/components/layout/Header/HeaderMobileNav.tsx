import React from 'react';
import type { Page } from '../../../types';

interface HeaderMobileNavProps {
  navLinks: Array<{ label: string; page: Page }>;
  isLoggedIn: boolean;
  darkMode: boolean;
  onNavigate: (page: Page) => void;
  onClose: () => void;
}

export function HeaderMobileNav({
  navLinks,
  isLoggedIn,
  darkMode,
  onNavigate,
  onClose,
}: HeaderMobileNavProps) {
  return (
    <div className={`md:hidden border-t ${darkMode ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
      <div className="px-4 py-4 flex flex-col gap-4">
        {navLinks.map(link => (
          <button
            key={link.page}
            onClick={() => {
              onNavigate(link.page);
              onClose();
            }}
            className={`text-left text-sm tracking-widest uppercase ${
              darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'
            }`}
          >
            {link.label}
          </button>
        ))}
        {!isLoggedIn && (
          <button
            onClick={() => {
              onNavigate('login');
              onClose();
            }}
            className={`text-left text-sm tracking-widest uppercase ${
              darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'
            }`}
          >
            Ingresar
          </button>
        )}
      </div>
    </div>
  );
}
