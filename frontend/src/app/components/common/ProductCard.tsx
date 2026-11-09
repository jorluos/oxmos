import { Heart } from 'lucide-react';
import type { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../data';
import {
  getProductPrimaryImage,
  getProductColors,
  getProductDiscount,
  getProductCategoryLabel,
} from '../../utils/productHelpers';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { navigate, toggleWishlist, wishlist, darkMode } = useApp();

  const isWishlisted = wishlist.includes(product.id as number);
  const primaryImage = getProductPrimaryImage(product);
  const colors = getProductColors(product);
  const discount = getProductDiscount(product);
  const categoryLabel = getProductCategoryLabel(product);

  return (
    <div
      onClick={() => navigate('product', String(product.id))}
      className="group cursor-pointer flex flex-col"
    >
      {/* Image container */}
      <div className={`relative aspect-[3/4] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black/20 text-xs">
            Sin imagen
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {categoryLabel && (
            <span className={`text-[9px] tracking-widest px-2 py-0.5 uppercase ${
              darkMode ? 'bg-white text-black' : 'bg-black text-white'
            }`}>
              {categoryLabel}
            </span>
          )}
          {discount && (
            <span className={`text-[9px] tracking-widest px-2 py-0.5 ${
              darkMode ? 'bg-white text-black' : 'bg-black text-white'
            }`}>
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            toggleWishlist(product.id as number);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 ${
            isWishlisted
              ? 'opacity-100 bg-red-50 text-red-500'
              : darkMode
              ? 'bg-black/60 text-white hover:bg-black'
              : 'bg-white/80 text-black hover:bg-white'
          }`}
          aria-label="Favoritos"
        >
          <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick view on hover */}
        <div className="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              navigate('product', String(product.id));
            }}
            className={`w-full py-2 text-xs tracking-widest uppercase border transition-colors ${
              darkMode
                ? 'bg-black text-white hover:bg-white hover:text-black'
                : 'bg-white text-black hover:bg-black hover:text-white'
            }`}
          >
            Ver producto
          </button>
        </div>
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
