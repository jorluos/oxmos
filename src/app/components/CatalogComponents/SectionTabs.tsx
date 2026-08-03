import React from 'react';
import { useApp } from '../../context/AppContext';
import { SectionFilter, SortOption, SORT_LABELS, PAGE_SIZE } from './useCatalog';

interface SectionTabsProps {
  section: SectionFilter;
  setSection: (section: SectionFilter) => void;
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  filteredCount: number;
  setVisibleCount: (count: number) => void;
}

export function SectionTabs({
  section,
  setSection,
  sort,
  setSort,
  filteredCount,
  setVisibleCount,
}: SectionTabsProps) {
  const { darkMode } = useApp();

  return (
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
          <span className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{filteredCount} productos</span>
          <select
            value={sort}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as SortOption)}
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
  );
}
