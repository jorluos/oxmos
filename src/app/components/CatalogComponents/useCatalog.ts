import { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GENDERS, COLOR_OPTIONS } from '../../data';
import type { Gender } from '../../types';
import { getProductColors, getProductSizes, getProductCategoryLabel } from '../productHelpers';

export type SortOption = 'recomendado' | 'precio-asc' | 'precio-desc' | 'popular';
export type SectionFilter = 'TODOS' | 'NUEVO' | 'TENDENCIA' | 'OFERTA';

export const SORT_LABELS: Record<SortOption, string> = {
  recomendado: 'Recomendados',
  'precio-asc': 'Menor precio',
  'precio-desc': 'Mayor precio',
  popular: 'Más populares',
};

export const PAGE_SIZE = 6;

export function useCatalog() {
  const { products, catalogGender } = useApp();
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [section, setSection] = useState<SectionFilter>('TODOS');
  const [sort, setSort] = useState<SortOption>('recomendado');
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>(() => (catalogGender ? [catalogGender] : []));
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    genero: true, tipo: true, color: true, talla: false,
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

    // Filtrar por colección (NUEVO, TENDENCIA, OFERTA)
    if (section !== 'TODOS') {
      list = list.filter(p => {
        const label = getProductCategoryLabel(p);
        return label?.toLowerCase() === section.toLowerCase();
      });
    }

    if (selectedGenders.length) list = list.filter(p => selectedGenders.includes(p.gender as Gender));
    if (selectedTypes.length) list = list.filter(p => selectedTypes.includes(p.type ?? ''));

    if (selectedColors.length) {
      list = list.filter(p => {
        const colors = getProductColors(p);
        return colors.some(c => selectedColors.includes(c.hex));
      });
    }

    if (selectedSizes.length) {
      list = list.filter(p => {
        const sizes = getProductSizes(p);
        return sizes.some(s => selectedSizes.includes(s));
      });
    }

    switch (sort) {
      case 'precio-asc': list.sort((a, b) => a.base_price - b.base_price); break;
      case 'precio-desc': list.sort((a, b) => b.base_price - a.base_price); break;
      case 'popular': list.sort((a, b) => (b.reviews_count ?? 0) - (a.reviews_count ?? 0)); break;
      default: list.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)); break;
    }

    return list;
  }, [products, section, selectedGenders, selectedTypes, selectedColors, selectedSizes, sort]);

  const visible = useMemo(() => filtered.slice(0, visibleCount), [filtered, visibleCount]);
  const hasMore = visibleCount < filtered.length;

  const activeFilterCount =
    selectedGenders.length + selectedTypes.length + selectedColors.length + selectedSizes.length;

  const clearAll = () => {
    setSelectedGenders([]);
    setSelectedTypes([]);
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  // Obtener tipos únicos de productos desde los datos reales
  const availableTypes = useMemo(() => {
    const types = new Set(products.map(p => p.type).filter(Boolean));
    return Array.from(types) as string[];
  }, [products]);

  return {
    products,
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
  };
}
