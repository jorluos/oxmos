import { X, ChevronDown, ChevronUp } from 'lucide-react';
import type { Gender } from '../../../types';
import { GENDERS, COLOR_OPTIONS } from '../../../data';

interface CatalogSidebarProps {
  filtersOpen: boolean;
  onClose: () => void;
  onClearAll: () => void;
  activeFiltersCount: number;
  expandedFilters: Record<string, boolean>;
  onToggleFilter: (filterName: string) => void;
  selectedGenders: Gender[];
  onToggleGender: (gender: Gender) => void;
  selectedTypes: string[];
  availableTypes: string[];
  onToggleType: (type: string) => void;
  selectedColors: string[];
  onToggleColor: (hex: string) => void;
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
  isFilterActive: boolean;
  darkMode: boolean;
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export function CatalogSidebar({
  filtersOpen,
  onClose,
  onClearAll,
  activeFiltersCount,
  expandedFilters,
  onToggleFilter,
  selectedGenders,
  onToggleGender,
  selectedTypes,
  availableTypes,
  onToggleType,
  selectedColors,
  onToggleColor,
  selectedSizes,
  onToggleSize,
  isFilterActive,
  darkMode,
}: CatalogSidebarProps) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-72 p-6 overflow-y-auto transition-transform duration-300 lg:static lg:z-auto lg:w-56 lg:p-0 lg:overflow-visible lg:translate-x-0
        ${filtersOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}
      `}
    >
      {/* Mobile sidebar header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-black/10 lg:hidden">
        <h2 className="text-sm font-medium uppercase tracking-wider">Filtros</h2>
        <button onClick={onClose} aria-label="Cerrar filtros">
          <X size={18} />
        </button>
      </div>

      {/* Clear all active filters */}
      {isFilterActive && (
        <button
          onClick={onClearAll}
          className={`text-xs underline mb-6 block ${darkMode ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
        >
          Limpiar filtros ({activeFiltersCount})
        </button>
      )}

      <div className="space-y-6">
        {/* Gender */}
        <div className="border-b border-black/10 pb-5">
          <button
            onClick={() => onToggleFilter('gender')}
            className="flex items-center justify-between w-full text-xs tracking-widest uppercase mb-3 font-medium"
          >
            <span>Género</span>
            {expandedFilters.gender ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {expandedFilters.gender && (
            <div className="space-y-2">
              {GENDERS.map((g: Gender) => (
                <label key={g} className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedGenders.includes(g)}
                    onChange={() => onToggleGender(g)}
                    className="accent-black"
                  />
                  <span className={darkMode ? 'text-white/70' : 'text-black/70'}>{g}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Type */}
        {availableTypes.length > 0 && (
          <div className="border-b border-black/10 pb-5">
            <button
              onClick={() => onToggleFilter('type')}
              className="flex items-center justify-between w-full text-xs tracking-widest uppercase mb-3 font-medium"
            >
              <span>Tipo de prenda</span>
              {expandedFilters.type ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {expandedFilters.type && (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {availableTypes.map((type: string) => (
                  <label key={type} className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => onToggleType(type)}
                      className="accent-black"
                    />
                    <span className={darkMode ? 'text-white/70' : 'text-black/70'}>{type}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Colors */}
        <div className="border-b border-black/10 pb-5">
          <button
            onClick={() => onToggleFilter('color')}
            className="flex items-center justify-between w-full text-xs tracking-widest uppercase mb-3 font-medium"
          >
            <span>Color</span>
            {expandedFilters.color ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {expandedFilters.color && (
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map((c: { hex: string; name: string }) => {
                const isSelected = selectedColors.includes(c.hex);
                return (
                  <button
                    key={c.hex}
                    title={c.name}
                    onClick={() => onToggleColor(c.hex)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                      isSelected
                        ? darkMode ? 'border-white scale-110' : 'border-black scale-110'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Sizes */}
        <div className="border-b border-black/10 pb-5">
          <button
            onClick={() => onToggleFilter('size')}
            className="flex items-center justify-between w-full text-xs tracking-widest uppercase mb-3 font-medium"
          >
            <span>Talla</span>
            {expandedFilters.size ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {expandedFilters.size && (
            <div className="flex flex-wrap gap-1.5">
              {SIZES.map((size: string) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => onToggleSize(size)}
                    className={`px-2.5 py-1 text-xs border transition-colors ${
                      isSelected
                        ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                        : darkMode ? 'border-white/20 text-white hover:border-white' : 'border-black/20 text-black hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
