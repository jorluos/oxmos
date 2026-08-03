import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../ProductCard';
import { COLOR_OPTIONS } from '../../data';
import type { Gender, Product } from '../../types';
import { PAGE_SIZE } from './useCatalog';

interface CatalogGridProps {
  filtersOpen: boolean;
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  selectedGenders: Gender[];
  setSelectedGenders: (genders: Gender[]) => void;
  visible: Product[];
  clearAll: () => void;
  hasMore: boolean;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  filteredLength: number;
  visibleCount: number;
  toggleItem: any;
}

export function CatalogGrid({
  filtersOpen,
  setFiltersOpen,
  selectedColors,
  setSelectedColors,
  selectedGenders,
  setSelectedGenders,
  visible,
  clearAll,
  hasMore,
  setVisibleCount,
  filteredLength,
  visibleCount,
  toggleItem,
}: CatalogGridProps) {
  const { darkMode } = useApp();

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setFiltersOpen(v => !v)}
          className={`flex items-center gap-2 text-xs tracking-wide border px-3 py-2 transition-colors ${
            darkMode
              ? 'border-white/20 text-white hover:bg-white hover:text-black'
              : 'border-black/20 text-black hover:bg-black hover:text-white'
          }`}
        >
          <SlidersHorizontal size={14} />
          {filtersOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
        </button>
        {/* Active filter chips */}
        {selectedColors.map(c => {
          const colorOpt = COLOR_OPTIONS.find(o => o.hex === c);
          return (
            <button
              key={c}
              onClick={() => toggleItem(selectedColors, c, setSelectedColors)}
              className={`flex items-center gap-1 text-xs border px-2 py-1 transition-colors ${
                darkMode
                  ? 'border-white/20 text-white hover:bg-white/5'
                  : 'border-black/20 text-black hover:bg-black/5'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: c }} />
              {colorOpt?.name}
              <X size={10} />
            </button>
          );
        })}
        {selectedGenders.map(g => (
          <button
            key={g}
            onClick={() => toggleItem(selectedGenders, g, setSelectedGenders)}
            className={`flex items-center gap-1 text-xs border px-2 py-1 transition-colors ${
              darkMode
                ? 'border-white/20 text-white hover:bg-white/5'
                : 'border-black/20 text-black hover:bg-black/5'
              }`}
          >
            {g} <X size={10} />
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-4xl mb-4">🔍</p>
          <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-black/50'}`}>No hay productos que coincidan con los filtros.</p>
          <button onClick={clearAll} className={`mt-4 text-sm underline ${
            darkMode ? 'text-white hover:text-white/60' : 'text-black hover:text-black/60'
          }`}>
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {visible.map(product => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
            className={`px-12 py-3 border text-sm tracking-widest uppercase transition-colors ${
              darkMode
                ? 'border-white text-white hover:bg-white hover:text-black'
                : 'border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            Cargar más ({filteredLength - visibleCount} restantes)
          </button>
        </div>
      )}
    </div>
  );
}
