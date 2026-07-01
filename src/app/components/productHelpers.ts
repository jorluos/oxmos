import type { Product } from '../types';

/**
 * Obtiene la URL de la imagen primaria de un producto (la marcada como is_primary o la primera)
 */
export function getProductPrimaryImage(product: Product): string {
  return product.images?.find(img => img.is_primary)?.image_url
    ?? product.images?.[0]?.image_url
    ?? '';
}

/**
 * Obtiene todas las imágenes de un producto
 */
export function getProductImages(product: Product): string[] {
  return product.images
    ?.sort((a, b) => a.position - b.position)
    .map(img => img.image_url) ?? [];
}

/**
 * Obtiene colores únicos desde las variantes (sin duplicados)
 */
export function getProductColors(product: Product): { hex: string; name: string }[] {
  if (!product.variants?.length) return [];
  const map = new Map<string, string>();
  product.variants.forEach(v => {
    if (v.color_hex && v.color_name && !map.has(v.color_hex)) {
      map.set(v.color_hex, v.color_name);
    }
  });
  return Array.from(map, ([hex, name]) => ({ hex, name }));
}

/**
 * Obtiene tallas únicas desde las variantes
 */
export function getProductSizes(product: Product): string[] {
  if (!product.variants?.length) return [];
  const unique = new Set(product.variants.map(v => v.size));
  return Array.from(unique);
}

/**
 * Obtiene stock por talla desde las variantes
 */
export function getProductStockBySize(product: Product): Record<string, number> {
  if (!product.variants?.length) return {};
  const stock: Record<string, number> = {};
  product.variants.forEach(v => {
    stock[v.size] = (stock[v.size] ?? 0) + v.stock;
  });
  return stock;
}

/**
 * Calcula el porcentaje de descuento
 */
export function getProductDiscount(product: Product): number | null {
  if (!product.original_price || product.original_price <= product.base_price) return null;
  return Math.round((1 - product.base_price / product.original_price) * 100);
}

/**
 * Obtiene el label de categoría (NUEVO, TENDENCIA, OFERTA) desde las colecciones
 */
export function getProductCategoryLabel(product: Product): string | null {
  const collectionNames = product.collections?.map(c => c.name?.toLowerCase()) ?? [];
  if (collectionNames.includes('nuevo')) return 'Nuevo';
  if (collectionNames.includes('tendencia')) return 'Tendencia';
  if (collectionNames.includes('oferta')) return 'Oferta';
  return null;
}

/**
 * Obtiene el precio mínimo de las variantes (para mostrar como "desde")
 */
export function getMinVariantPrice(product: Product): number {
  if (!product.variants?.length) return product.base_price;
  const active = product.variants.filter(v => v.is_active);
  if (!active.length) return product.base_price;
  return Math.min(...active.map(v => v.price));
}