import React from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../data';
import type { Product } from '../../types';

interface ProductOptionsProps {
  product: Product;
  colors: Array<{ hex: string; name: string }>;
  sizes: string[];
  stockBySize: Record<string, number>;
  selectedSize: string;
  selectedColorHex: string;
  currentColorHex: string;
  currentColorName: string;
  quantity: number;
  sizeError: boolean;
  added: boolean;
  isWishlisted: boolean;
  displayPrice: number;
  displayOriginalPrice?: number;
  discount: number;
  stockForSize: number | null;
  darkMode: boolean;
  onSelectColor: (hex: string) => void;
  onSelectSize: (size: string) => void;
  onQuantityChange: (qty: number) => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  onToggleWishlist: () => void;
}

export function ProductOptions({
  product,
  colors,
  sizes,
  stockBySize,
  selectedSize,
  selectedColorHex,
  currentColorHex,
  currentColorName,
  quantity,
  sizeError,
  added,
  isWishlisted,
  displayPrice,
  displayOriginalPrice,
  discount,
  stockForSize,
  darkMode,
  onSelectColor,
  onSelectSize,
  onQuantityChange,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
}: ProductOptionsProps) {
  return (
    <div className="space-y-6">
      {/* Title & Brand */}
      <div>
        <div className="flex items-center justify-between">
          <p className={`text-xs tracking-[0.3em] uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
            {product.gender} · {product.type ?? 'General'}
          </p>
          <button
            onClick={onToggleWishlist}
            className={`p-2 transition-colors ${
              isWishlisted
                ? 'text-red-500'
                : darkMode
                ? 'text-white/40 hover:text-white'
                : 'text-black/40 hover:text-black'
            }`}
            aria-label="Guardar en favoritos"
          >
            <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
        <h1 className="text-2xl sm:text-3xl font-light mt-1">{product.name}</h1>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-2xl font-medium">{formatPrice(displayPrice)}</span>
        {displayOriginalPrice && displayOriginalPrice > displayPrice && (
          <>
            <span className={`text-base line-through ${darkMode ? 'text-white/30' : 'text-black/30'}`}>
              {formatPrice(displayOriginalPrice)}
            </span>
            <span className="text-xs bg-red-500 text-white px-2 py-0.5 font-medium">
              -{discount}%
            </span>
          </>
        )}
      </div>

      {/* Color picker */}
      {colors.length > 0 && (
        <div>
          <p className={`text-xs tracking-widest uppercase mb-2 ${darkMode ? 'text-white/70' : 'text-black'}`}>
            Color: <span className={darkMode ? 'text-white/50' : 'text-black/50'}>{currentColorName}</span>
          </p>
          <div className="flex gap-2">
            {colors.map(c => (
              <button
                key={c.hex}
                onClick={() => onSelectColor(c.hex)}
                title={c.name}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                  (selectedColorHex || currentColorHex) === c.hex
                    ? (darkMode ? 'border-white scale-110' : 'border-black scale-110')
                    : 'border-transparent'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size picker */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className={`text-xs tracking-widest uppercase ${sizeError ? 'text-red-500 font-medium' : darkMode ? 'text-white/70' : 'text-black'}`}>
            Talla {sizeError && '— Selecciona una talla'}
          </p>
          {stockForSize !== null && (
            <span className={`text-xs ${stockForSize <= 3 ? 'text-red-500' : darkMode ? 'text-white/40' : 'text-black/40'}`}>
              {stockForSize === 0 ? 'Agotado' : stockForSize <= 3 ? `¡Solo quedan ${stockForSize}!` : `${stockForSize} disponibles`}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map(size => {
            const stock = stockBySize[size] ?? 0;
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                disabled={stock === 0}
                onClick={() => onSelectSize(size)}
                className={`min-w-[48px] h-10 px-3 text-xs tracking-wider border transition-colors ${
                  isSelected
                    ? darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                    : stock === 0
                    ? darkMode ? 'border-white/10 text-white/20 line-through cursor-not-allowed' : 'border-black/10 text-black/20 line-through cursor-not-allowed'
                    : darkMode ? 'border-white/20 text-white hover:border-white' : 'border-black/20 text-black hover:border-black'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <p className={`text-xs tracking-widest uppercase mb-2 ${darkMode ? 'text-white/70' : 'text-black'}`}>Cantidad</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className={`w-9 h-9 border flex items-center justify-center transition-colors ${
              darkMode ? 'border-white/20 hover:border-white' : 'border-black/20 hover:border-black'
            }`}
          >
            -
          </button>
          <span className="text-sm font-medium w-6 text-center">{quantity}</span>
          <button
            onClick={() => onQuantityChange(Math.min(stockForSize ?? 10, quantity + 1))}
            className={`w-9 h-9 border flex items-center justify-center transition-colors ${
              darkMode ? 'border-white/20 hover:border-white' : 'border-black/20 hover:border-black'
            }`}
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={onAddToCart}
          className={`w-full py-4 text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-all ${
            added
              ? 'bg-green-700 text-white'
              : darkMode
              ? 'bg-white text-black hover:bg-white/80'
              : 'bg-black text-white hover:bg-black/80'
          }`}
        >
          <ShoppingBag size={16} />
          {added ? '¡Agregado al carrito!' : 'Agregar al carrito'}
        </button>

        <button
          onClick={onBuyNow}
          className={`w-full py-4 text-sm tracking-widest uppercase border flex items-center justify-center gap-2 transition-colors ${
            darkMode
              ? 'border-white/30 text-white hover:bg-white/10'
              : 'border-black/30 text-black hover:bg-black/5'
          }`}
        >
          Comprar ahora <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
