import React from 'react';
import { formatPrice } from '../../data';
import type { CartItem, Product } from '../../types';

interface OrderSummaryProps {
  cart: CartItem[];
  cartTotal: number;
  getProduct: (id: string) => Product | undefined;
  darkMode: boolean;
}

export function OrderSummary({
  cart,
  cartTotal,
  getProduct,
  darkMode,
}: OrderSummaryProps) {
  return (
    <div className={`border p-5 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
      <h3 className={`border-b pb-3 mb-4 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
        Resumen del pedido
      </h3>
      <div className="space-y-4 max-h-72 overflow-y-auto mb-4">
        {cart.map((item, idx) => {
          const product = getProduct(String(item.product_id));
          if (!product) return null;
          const variant = product.variants?.find(v => v.id === item.product_variant_id);
          const sizeName = variant?.size ?? '';
          const image =
            product.images?.find(img => img.is_primary)?.image_url ??
            product.images?.[0]?.image_url ??
            '';
          return (
            <div key={idx} className="flex gap-3">
              <div className={`w-16 h-20 flex-shrink-0 overflow-hidden relative ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <img src={image} alt={product.name} className="w-full h-full object-cover" />
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1">
                <p className={`text-sm ${darkMode ? 'text-white' : 'text-black'}`}>{product.name}</p>
                <p className={`text-xs mt-0.5 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
                  Talla {sizeName}
                </p>
                <p className={`text-sm font-medium mt-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                  {formatPrice(item.unit_price * item.quantity)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`border-t pt-4 space-y-2 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
        <div className="flex justify-between text-sm">
          <span className={darkMode ? 'text-white/60' : 'text-black/60'}>Subtotal</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className={darkMode ? 'text-white/60' : 'text-black/60'}>Envío</span>
          <span className={darkMode ? 'text-white/40' : 'text-black/40'}>Por calcular</span>
        </div>
        <div className={`flex justify-between text-base pt-2 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Total</span>
          <span className="font-medium">{formatPrice(cartTotal)}</span>
        </div>
      </div>
      <p className={`text-[11px] mt-4 leading-relaxed ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
        El costo de envío se calcula según tu ciudad y se cobrará junto con el pedido al momento de entrega.
      </p>
    </div>
  );
}
