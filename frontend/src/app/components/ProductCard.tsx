import { type MouseEvent } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Product } from '../types';
import { formatPrice } from '../data';
import { getProductPrimaryImage, getProductColors, getProductDiscount, getProductCategoryLabel } from './productHelpers';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { navigate, toggleWishlist, wishlist, addToCart, darkMode } = useApp();
  const isWishlisted = wishlist.includes(product.id as number);

  const primaryImage = getProductPrimaryImage(product);
  const colors = getProductColors(product);
  const discount = getProductDiscount(product);
  const categoryLabel = getProductCategoryLabel(product);

  const handleQuickAdd = (e: MouseEvent) => {
    e.stopPropagation();
    // Encontrar la primera variante con stock disponible
    const firstVariant = product.variants?.find(v => v.is_active && v.stock > 0) ?? product.variants?.[0];
    if (firstVariant) {
      addToCart(product.id as number, firstVariant.id, 1);
    }
  };

  const handleWishlist = (e: MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id as number);
  };

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate('product', String(product.id))}
    >
      {/* Image with hover effect */}
      <div className={`relative aspect-[3/4] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        {/* Solo usamos la imagen primaria con hover simple */}
        <img
          src={primaryImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {categoryLabel && (
            <span className={`text-[9px] tracking-widest px-2 py-1 uppercase ${
              darkMode ? 'bg-white text-black' : 'bg-black text-white'
            }`}>{categoryLabel}</span>
          )}
          {discount && (
            <span className={`text-[9px] tracking-widest px-2 py-1 ${
              darkMode ? 'bg-white text-black' : 'bg-black text-white'
            }`}>-{discount}%</span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm ${
            darkMode
              ? 'bg-black text-white hover:bg-white hover:text-black'
              : 'bg-white text-black hover:bg-black hover:text-white'
          }`}
          aria-label={isWishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart
            size={15}
            className={isWishlisted ? (darkMode ? 'fill-white text-white' : 'fill-black text-black') : ''}
          />
        </button>

        {/* Quick add to cart */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-0 left-0 right-0 text-xs tracking-widest uppercase py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ${
            darkMode ? 'bg-white text-black' : 'bg-black text-white'
          }`}
        >
          <ShoppingBag size={14} />
          Agregar al carrito
        </button>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <div className="flex items-center justify-between">
          <div>
            <p className={`text-[11px] tracking-wide uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
              {product.gender} · {product.type ?? 'General'}
            </p>
            <p className={`text-sm mt-0.5 ${darkMode ? 'text-white' : 'text-black'}`}>{product.name}</p>
          </div>
        </div>

        {/* Color swatches */}
        {colors.length > 0 && (
          <div className="flex items-center gap-1 mt-2">
            {colors.map((c: { hex: string; name: string }, i: number) => (
              <div
                key={i}
                title={c.name}
                className={`w-3.5 h-3.5 rounded-full border cursor-pointer hover:scale-125 transition-transform ${
                  darkMode ? 'border-white/20' : 'border-black/20'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-2">
          <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>
            {formatPrice(product.base_price)}
          </span>
          {product.original_price && (
            <span className={`text-xs line-through ${darkMode ? 'text-white/30' : 'text-black/30'}`}>
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}