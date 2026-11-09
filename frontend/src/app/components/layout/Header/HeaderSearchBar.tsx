import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface HeaderSearchBarProps {
  searchQuery: string;
  darkMode: boolean;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onClose: () => void;
}

export function HeaderSearchBar({
  searchQuery,
  darkMode,
  onSearchChange,
  onSearchSubmit,
  onClose,
}: HeaderSearchBarProps) {
  const searchBoxRef = useRef<HTMLFormElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    searchInputRef.current?.focus();

    const handlePointerDown = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onSearchSubmit();
      }
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onSearchSubmit]);

  return (
    <form
      ref={searchBoxRef}
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        onSearchSubmit();
      }}
      className={`border-t py-3 flex items-center gap-2 ${darkMode ? 'border-white/10' : 'border-black/10'}`}
    >
      <Search size={18} className={darkMode ? 'text-white/40' : 'text-black/40'} />
      <input
        ref={searchInputRef}
        autoFocus
        type="text"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        placeholder="Buscar prendas, marcas..."
        className={`flex-1 outline-none text-sm bg-transparent ${
          darkMode ? 'text-white placeholder:text-white/40' : 'text-black placeholder:text-black/40'
        }`}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Escape') onClose();
          if (e.key === 'Enter') onSearchSubmit();
        }}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter') onSearchSubmit();
        }}
        onBlur={onClose}
      />
      <button
        type="button"
        onClick={onClose}
        className={darkMode ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}
        aria-label="Cerrar búsqueda"
      >
        <X size={18} />
      </button>
    </form>
  );
}
