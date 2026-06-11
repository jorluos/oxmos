import { useState, useMemo, useEffect, useRef } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, X, ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { GARMENT_TYPES, LENGTHS, SIZES, GENDERS, COLOR_OPTIONS } from '../data';
import type { ProductCategory, Gender } from '../types';
import type { ChangeEvent } from 'react';

type SortOption = 'recomendado' | 'precio-asc' | 'precio-desc' | 'popular';
type SectionFilter = 'TODOS' | ProductCategory;

const SORT_LABELS: Record<SortOption, string> = {
  recomendado: 'Recomendados',
  'precio-asc': 'Menor precio',
  'precio-desc': 'Mayor precio',
  popular: 'Más populares',
};

const PAGE_SIZE = 6;

export function Catalog() {
  const { products, darkMode } = useApp();
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [section, setSection] = useState<SectionFilter>('TODOS');
  const [sort, setSort] = useState<SortOption>('recomendado');
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLengths, setSelectedLengths] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    genero: true, tipo: true, color: true, longitud: false, talla: false,
  });

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleFilter = (filterName: string) =>
    setExpandedFilters(f => ({ ...f, [filterName]: !f[filterName] }));

  const toggleItem = <T,>(arr: T[], item: T, set: (v: T[]) => void) => {
    set(arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item]);
  };

  const filtered = useMemo(() => {
    let list = [...products];

    if (section !== 'TODOS') list = list.filter(p => p.category === section);
    if (selectedGenders.length) list = list.filter(p => selectedGenders.includes(p.gender));
    if (selectedTypes.length) list = list.filter(p => selectedTypes.includes(p.type));
    if (selectedLengths.length) list = list.filter(p => selectedLengths.includes(p.length));
    if (selectedColors.length)
      list = list.filter(p => p.colors.some(c => selectedColors.includes(c)));
    if (selectedSizes.length)
      list = list.filter(p => selectedSizes.some(s => (p.stock[s] ?? 0) > 0));

    switch (sort) {
      case 'precio-asc': list.sort((a, b) => a.price - b.price); break;
      case 'precio-desc': list.sort((a, b) => b.price - a.price); break;
      case 'popular': list.sort((a, b) => b.reviews - a.reviews); break;
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }

    return list;
  }, [products, section, selectedGenders, selectedTypes, selectedLengths, selectedColors, selectedSizes, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const activeFilterCount =
    selectedGenders.length + selectedTypes.length + selectedLengths.length +
    selectedColors.length + selectedSizes.length;

  const clearAll = () => {
    setSelectedGenders([]);
    setSelectedTypes([]);
    setSelectedLengths([]);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

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
    <div className={`min-h-screen pt-16 transition-colors ${darkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Section tabs */}
      <div className={`border-b sticky top-16 z-30 transition-colors ${
        darkMode ? 'border-white/10 bg-black' : 'border-black/10 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex">
            {(['TODOS', 'NUEVO', 'TENDENCIA', 'OFERTA'] as SectionFilter[]).map(s => (
              <button
                key={s}
                onClick={() => { setSection(s); setVisibleCount(PAGE_SIZE); }}
                className={`px-5 py-4 text-xs tracking-widest uppercase border-b-2 transition-colors ${
                  darkMode
                    ? section === s ? 'border-white text-white' : 'border-transparent text-white/40 hover:text-white'
                    : section === s ? 'border-black text-black' : 'border-transparent text-black/40 hover:text-black'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{filtered.length} productos</span>
            <select
              value={sort}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSort(e.target.value as SortOption)
                }
              className={`text-xs border px-2 py-1.5 outline-none cursor-pointer transition-colors ${
                darkMode ? 'border-white/20 bg-black text-white' : 'border-black/20 bg-white text-black'
              }`}
            >
              {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Filters sidebar */}
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

              <FilterSection name="tipo" label="Tipo de prenda">
                <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                  {GARMENT_TYPES.map(t => (
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

              <FilterSection name="longitud" label="Longitud">
                <div className="flex flex-col gap-2">
                  {LENGTHS.map(l => (
                    <label key={l} className={`flex items-center gap-2 cursor-pointer ${darkMode ? 'text-white' : 'text-black'}`}>
                      <input
                        type="checkbox"
                        checked={selectedLengths.includes(l)}
                        onChange={() => toggleItem(selectedLengths, l, setSelectedLengths)}
                        className={`w-3.5 h-3.5 ${darkMode ? 'accent-white' : 'accent-black'}`}
                      />
                      <span className="text-sm">{l}</span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection name="talla" label="Talla">
                <div className="flex flex-wrap gap-2">
                  {SIZES.map(s => (
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

          {/* Product grid */}
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
                  Cargar más ({filtered.length - visibleCount} restantes)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-24 right-6 w-10 h-10 flex items-center justify-center shadow-lg transition-colors z-40 ${
            darkMode ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-black/80'
          }`}
          aria-label="Volver arriba"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
