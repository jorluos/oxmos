import React from 'react';
import type { Product } from '../../types';

interface ProductSpecsProps {
  product: Product;
  sizes: string[];
  colors: Array<{ hex: string; name: string }>;
  darkMode: boolean;
}

export function ProductSpecs({ product, sizes, colors, darkMode }: ProductSpecsProps) {
  return (
    <div className="space-y-5">
      {/* Description */}
      {product.short_description && (
        <div className={`border-t pt-5 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
          <p className={`text-xs tracking-widest uppercase mb-3 ${darkMode ? 'text-white/70' : 'text-black'}`}>
            Descripción
          </p>
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
            {product.short_description}
          </p>
        </div>
      )}

      {/* Details */}
      {(product.material || product.brand || product.care_instructions) && (
        <div className={`border-t pt-5 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className={`grid grid-cols-2 gap-y-2 text-xs ${darkMode ? 'text-white' : 'text-black'}`}>
            {product.brand && (
              <>
                <span className={darkMode ? 'text-white/40' : 'text-black/40'}>Marca</span>
                <span>{product.brand}</span>
              </>
            )}
            {product.material && (
              <>
                <span className={darkMode ? 'text-white/40' : 'text-black/40'}>Material</span>
                <span>{product.material}</span>
              </>
            )}
            {sizes.length > 0 && (
              <>
                <span className={darkMode ? 'text-white/40' : 'text-black/40'}>Tallas</span>
                <span>{sizes.join(', ')}</span>
              </>
            )}
            {colors.length > 0 && (
              <>
                <span className={darkMode ? 'text-white/40' : 'text-black/40'}>Colores</span>
                <span>{colors.map(c => c.name).join(', ')}</span>
              </>
            )}
            {product.gender && (
              <>
                <span className={darkMode ? 'text-white/40' : 'text-black/40'}>Género</span>
                <span>{product.gender}</span>
              </>
            )}
          </div>
          {product.care_instructions && (
            <div className="mt-3">
              <span className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Cuidados: </span>
              <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
                {product.care_instructions}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Shipping note */}
      <div className={`border p-4 ${darkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/2'}`}>
        <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
          💳 <strong>Pago contra entrega</strong> — Pagas cuando recibes tu pedido.<br />
          🚚 <strong>Envío a todo el país</strong> — Tiempo estimado: 3-5 días hábiles.
        </p>
      </div>
    </div>
  );
}
