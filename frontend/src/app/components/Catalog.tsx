import { ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCatalog } from './CatalogComponents/useCatalog';
import { SectionTabs } from './CatalogComponents/SectionTabs';
import { CatalogSidebar } from './CatalogComponents/CatalogSidebar';
import { CatalogGrid } from './CatalogComponents/CatalogGrid';

export function Catalog() {
  const { darkMode } = useApp();
  const {
    filtersOpen,
    setFiltersOpen,
    section,
    setSection,
    sort,
    setSort,
    selectedGenders,
    setSelectedGenders,
    selectedTypes,
    setSelectedTypes,
    selectedColors,
    setSelectedColors,
    selectedSizes,
    setSelectedSizes,
    visibleCount,
    setVisibleCount,
    showBackToTop,
    expandedFilters,
    toggleFilter,
    toggleItem,
    filtered,
    visible,
    hasMore,
    activeFilterCount,
    clearAll,
    availableTypes,
  } = useCatalog();

  return (
    <div className={`min-h-screen pt-16 transition-colors ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <SectionTabs
        section={section}
        setSection={setSection}
        sort={sort}
        setSort={setSort}
        filteredCount={filtered.length}
        setVisibleCount={setVisibleCount}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          <CatalogSidebar
            filtersOpen={filtersOpen}
            activeFilterCount={activeFilterCount}
            clearAll={clearAll}
            expandedFilters={expandedFilters}
            toggleFilter={toggleFilter}
            selectedGenders={selectedGenders}
            setSelectedGenders={setSelectedGenders}
            availableTypes={availableTypes}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            toggleItem={toggleItem}
          />

          <CatalogGrid
            filtersOpen={filtersOpen}
            setFiltersOpen={setFiltersOpen}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedGenders={selectedGenders}
            setSelectedGenders={setSelectedGenders}
            visible={visible}
            clearAll={clearAll}
            hasMore={hasMore}
            setVisibleCount={setVisibleCount}
            filteredLength={filtered.length}
            visibleCount={visibleCount}
            toggleItem={toggleItem}
          />
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