import { useState, useMemo, useEffect, useCallback } from 'react';
import type { Product, Gender } from '../../../types';
import { useApp } from '../../../context/AppContext';

export function useCatalog() {
  const { products, catalogGender } = useApp();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [section, setSection] = useState('todo');
  const [sort, setSort] = useState('featured');
  const [selectedGenders, setSelectedGenders] = useState<Gender[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    gender: true,
    type: true,
    color: true,
    size: true,
  });

  const toggleFilter = useCallback((filterName: string) => {
    setExpandedFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  }, []);

  const toggleItem = useCallback(<T,>(setter: React.Dispatch<React.SetStateAction<T[]>>, item: T) => {
    setter(prev => (prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]));
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedGenders([]);
    setSelectedTypes([]);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSection('todo');
  }, []);

  const activeFiltersCount =
    selectedGenders.length + selectedTypes.length + selectedColors.length + selectedSizes.length;

  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    products.forEach((p: Product) => {
      if (p.type) types.add(p.type);
    });
    return Array.from(types);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product: Product) => {
      if (catalogGender) {
        const matchesGender =
          product.gender === catalogGender ||
          product.gender === 'Unisex';
        if (!matchesGender) return false;
      }

      if (selectedGenders.length > 0 && !selectedGenders.includes(product.gender)) return false;
      if (selectedTypes.length > 0 && (!product.type || !selectedTypes.includes(product.type))) return false;

      if (selectedColors.length > 0) {
        const productColors = product.variants?.map(v => v.color_hex).filter(Boolean) ?? [];
        if (!selectedColors.some(c => productColors.includes(c))) return false;
      }

      if (selectedSizes.length > 0) {
        const productSizes = product.variants?.map(v => v.size) ?? [];
        if (!selectedSizes.some(s => productSizes.includes(s))) return false;
      }

      return true;
    });
  }, [products, catalogGender, selectedGenders, selectedTypes, selectedColors, selectedSizes]);

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sort === 'price-asc') return list.sort((a, b) => a.base_price - b.base_price);
    if (sort === 'price-desc') return list.sort((a, b) => b.base_price - a.base_price);
    if (sort === 'newest') return list.sort((a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime());
    return list;
  }, [filteredProducts, sort]);

  const visibleProducts = useMemo(() => sortedProducts.slice(0, visibleCount), [sortedProducts, visibleCount]);

  const isFilterActive = activeFiltersCount > 0;

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
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
  };
}
