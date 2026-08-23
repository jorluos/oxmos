import type { Product } from '../../../types';
import { useApp } from '../../../context/AppContext';
import { ProductCard } from '../../common/ProductCard';

interface CatalogGridProps {
  products: Product[];
  totalCount: number;
  sort: string;
  onSortChange: (sort: string) => void;
  onOpenFilters: () => void;
  activeFiltersCount: number;
  visibleCount: number;
  onLoadMore: () => void;
  hasMore: boolean;
  onClearFilters: () => void;
  darkMode: boolean;
}

export function CatalogGrid({
  products,
  totalCount,
  sort,
  onSortChange,
  onOpenFilters,
  activeFiltersCount,
  onLoadMore,
  hasMore,
  onClearFilters,
  darkMode,
}: CatalogGridProps) {
  const { catalogGender } = useApp();

  const title = catalogGender
    ? `Colección ${catalogGender}`
    : 'Todas las Prendas';

  return (
    <main className="flex-1 min-w-0">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/10">
        <div>
          <h1 className="text-xl sm:text-2xl font-light">{title}</h1>
          <p className={`text-xs mt-0.5 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
            {totalCount} {totalCount === 1 ? 'producto' : 'productos'} encontrados
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile filters button */}
          <button
            onClick={onOpenFilters}
            className={`lg:hidden flex items-center gap-2 px-4 py-2 border text-xs tracking-wider uppercase transition-colors ${
              activeFiltersCount > 0
                ? darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'
                : darkMode ? 'border-white/20 text-white hover:border-white' : 'border-black/20 text-black hover:border-black'
            }`}
          >
            Filtros
            {activeFiltersCount > 0 && (
              <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${
                darkMode ? 'bg-black text-white' : 'bg-white text-black'
              }`}>
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={(e: any) => onSortChange(e.target.value)}
            className={`text-xs border px-3 py-2 outline-none cursor-pointer ${
              darkMode ? 'bg-black border-white/20 text-white' : 'bg-white border-black/20 text-black'
            }`}
          >
            <option value="featured">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="newest">Más recientes</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {products.length === 0 ? (
        <div className="py-24 text-center">
          <p className={`text-sm ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
            No encontramos prendas con los filtros seleccionados.
          </p>
          <button
            onClick={onClearFilters}
            className={`mt-4 px-6 py-2 border text-xs tracking-widest uppercase transition-colors ${
              darkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product: Product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={onLoadMore}
            className={`px-10 py-3 border text-xs tracking-widest uppercase transition-colors ${
              darkMode
                ? 'border-white/30 text-white hover:border-white hover:bg-white/5'
                : 'border-black/30 text-black hover:border-black hover:bg-black/5'
            }`}
          >
            Cargar más productos
          </button>
        </div>
      )}
    </main>
  );
}
