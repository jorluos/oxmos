import { ArrowUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCatalog } from '../components/features/catalog/useCatalog';
import { SectionTabs } from '../components/features/catalog/SectionTabs';
import { CatalogSidebar } from '../components/features/catalog/CatalogSidebar';
import { CatalogGrid } from '../components/features/catalog/CatalogGrid';

export function CatalogPage() {
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
    clearAllFilters,
    activeFiltersCount,
    availableTypes,
    filteredProducts,
    sortedProducts,
    visibleProducts,
    isFilterActive,
  } = useCatalog();

  return (
    <div className={`min-h-screen pt-16 transition-colors ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <SectionTabs
        section={section}
        onSectionChange={setSection}
        darkMode={darkMode}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          <CatalogSidebar
            filtersOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            onClearAll={clearAllFilters}
            activeFiltersCount={activeFiltersCount}
            expandedFilters={expandedFilters}
            onToggleFilter={toggleFilter}
            selectedGenders={selectedGenders}
            onToggleGender={g => toggleItem(setSelectedGenders, g)}
            selectedTypes={selectedTypes}
            availableTypes={availableTypes}
            onToggleType={t => toggleItem(setSelectedTypes, t)}
            selectedColors={selectedColors}
            onToggleColor={c => toggleItem(setSelectedColors, c)}
            selectedSizes={selectedSizes}
            onToggleSize={s => toggleItem(setSelectedSizes, s)}
            isFilterActive={isFilterActive}
            darkMode={darkMode}
          />

          <CatalogGrid
            products={visibleProducts}
            totalCount={filteredProducts.length}
            sort={sort}
            onSortChange={setSort}
            onOpenFilters={() => setFiltersOpen(true)}
            activeFiltersCount={activeFiltersCount}
            visibleCount={visibleCount}
            onLoadMore={() => setVisibleCount(c => c + 12)}
            hasMore={visibleCount < sortedProducts.length}
            onClearFilters={clearAllFilters}
            darkMode={darkMode}
          />
        </div>
      </div>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-20 right-6 z-30 w-10 h-10 border flex items-center justify-center shadow-lg transition-colors ${
            darkMode
              ? 'bg-black border-white/20 text-white hover:bg-white/10'
              : 'bg-white border-black/20 text-black hover:bg-black/5'
          }`}
          aria-label="Volver arriba"
        >
          <ArrowUp size={16} />
        </button>
      )}
    </div>
  );
}

export { CatalogPage as Catalog };
