import React from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { GENDERS, COLOR_OPTIONS } from '../../data';
import type { Gender } from '../../types';

interface CatalogSidebarProps {
  filtersOpen: boolean;
  activeFilterCount: number;
  clearAll: () => void;
  expandedFilters: Record<string, boolean>;
  toggleFilter: (name: string) => void;
  selectedGenders: Gender[];
  setSelectedGenders: (genders: Gender[]) => void;
  availableTypes: string[];
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  toggleItem: any;
}

export function CatalogSidebar({
  filtersOpen,
  activeFilterCount,
  clearAll,
  expandedFilters,
  toggleFilter,
  selectedGenders,
  setSelectedGenders,
  availableTypes,
  selectedTypes,
  setSelectedTypes,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  toggleItem,
}: CatalogSidebarProps) {
  const { darkMode } = useApp();

  const FilterSection = ({ name, label, children }: { name: string; label: string; children: React.ReactNode }) => (
    <div className={`border-b py-4 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
      <button
        className={`flex items-center justify-between w-full text-left ${darkMode ? 'text-white' : 'text-black'}`}
        onClick={() => toggleFilter(name)}
      >
        <span className="text-xs tracking-widest uppercase">{label}</span>
        {expandedFilters[name] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {expandedFilters[name] && <div className="mt-3">{children}</div>}
    </div>
  );

  return (
    <aside className={`${filtersOpen ? 'w-60' : 'w-0'} flex-shrink-0 overflow-hidden transition-all duration-300`}>
      <div className="w-60">
        <div className="flex items-center justify-between mb-4">
          <span className={`text-xs tracking-widest uppercase font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Filtros</span>
          {activeFilterCount > 0 && (
            <button onClick={clearAll} className={`text-xs flex items-center gap-1 ${
              darkMode ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'
            }`}>
              <X size={12} /> Limpiar ({activeFilterCount})
            </button>
          )}
        </div>

        <FilterSection name="genero" label="Género">
          <div className="flex flex-col gap-2">
            {GENDERS.map(g => (
              <label key={g} className={`flex items-center gap-2 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>
                <input
                  type="checkbox"
                  checked={selectedGenders.includes(g)}
                  onChange={() => toggleItem(selectedGenders, g, setSelectedGenders)}
                  className={`w-3.5 h-3.5 ${darkMode ? 'accent-white' : 'accent-black'}`}
                />
                <span className="text-sm">{g}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {availableTypes.length > 0 && (
          <FilterSection name="tipo" label="Tipo de prenda">
            <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
              {availableTypes.map(t => (
                <label key={t} className={`flex items-center gap-2 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(t)}
                    onChange={() => toggleItem(selectedTypes, t, setSelectedTypes)}
                    className={`w-3.5 h-3.5 ${darkMode ? 'accent-white' : 'accent-black'}`}
                  />
                  <span className="text-sm">{t}</span>
                </label>
              ))}
            </div>
          </FilterSection>
        )}

        <FilterSection name="color" label="Color">
          <div className="flex flex-wrap gap-2">
            {COLOR_OPTIONS.map(c => (
              <button
                key={c.hex}
                title={c.name}
                onClick={() => toggleItem(selectedColors, c.hex, setSelectedColors)}
                className={`w-6 h-6 rounded-full transition-all ${
                  selectedColors.includes(c.hex)
                    ? darkMode
                      ? 'ring-2 ring-offset-2 ring-white scale-110'
                      : 'ring-2 ring-offset-2 ring-black scale-110'
                    : 'hover:scale-110'
                }`}
                style={{
                  backgroundColor: c.hex,
                  border: c.hex === '#FFFFFF' ? '1px solid #ccc' : 'none',
                }}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection name="talla" label="Talla">
          <div className="flex flex-wrap gap-2">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
              <button
                key={s}
                onClick={() => toggleItem(selectedSizes, s, setSelectedSizes)}
                className={`w-9 h-9 text-xs border transition-colors ${
                  selectedSizes.includes(s)
                    ? darkMode
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-white border-black'
                    : darkMode
                      ? 'border-white/20 hover:border-white text-white'
                      : 'border-black/20 hover:border-black text-black'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
}
