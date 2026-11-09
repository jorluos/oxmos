import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { formatPrice } from '../../../data';

export function Cart() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateCartQty, navigate, cartTotal, getProduct, darkMode } = useApp();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
      >
        {/* Header */}
        <div className={`p-6 border-b flex items-center justify-between ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} />
            <h2 className="text-lg tracking-wide uppercase">Bolsa de compra</h2>
            <span className={`text-xs px-2 py-0.5 rounded-full ${darkMode ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className={`p-1 transition-colors ${darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
            aria-label="Cerrar bolsa"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag size={48} className={darkMode ? 'text-white/20 mb-4' : 'text-black/20 mb-4'} />
              <p className="text-base font-medium mb-1">Tu bolsa está vacía</p>
              <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-black/50'}`}>Descubre nuestras prendas y agrega tus favoritas</p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  navigate('catalog');
                }}
                className={`mt-6 px-6 py-2.5 text-xs tracking-widest uppercase transition-colors ${
                  darkMode ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'
                }`}
              >
                Explorar catálogo
              </button>
            </div>
          ) : (
            cart.map(item => {
              const product = getProduct(String(item.product_id));
              if (!product) return null;

              const variant = product.variants?.find(v => v.id === item.product_variant_id);
              const sizeName = variant?.size ?? '';
              const image =
                product.images?.find(img => img.is_primary)?.image_url ??
                product.images?.[0]?.image_url ??
                '';

              return (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className={`w-20 h-24 flex-shrink-0 overflow-hidden ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}>
                    <img src={image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-medium truncate">{product.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className={`text-xs transition-colors ${darkMode ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`}
                      >
                        Eliminar
                      </button>
                    </div>
                    <p className={`text-xs mt-0.5 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
                      Talla: {sizeName}
                    </p>
                    <p className="text-sm font-medium mt-2">{formatPrice(item.unit_price * item.quantity)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className={`flex items-center border ${darkMode ? 'border-white/20' : 'border-black/20'}`}>
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                          className={`p-1.5 transition-colors ${darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                          aria-label="Disminuir cantidad"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          className={`p-1.5 transition-colors ${darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
                          aria-label="Aumentar cantidad"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className={`p-6 border-t space-y-4 ${darkMode ? 'border-white/10 bg-black' : 'border-black/10 bg-white'}`}>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${darkMode ? 'text-white/60' : 'text-black/60'}`}>Subtotal</span>
              <span className="text-lg font-medium">{formatPrice(cartTotal)}</span>
            </div>
            <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
              Envío e impuestos calculados en el checkout
            </p>
            <button
              onClick={() => {
                setCartOpen(false);
                navigate('checkout');
              }}
              className={`w-full py-4 text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
                darkMode ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90'
              }`}
            >
              Finalizar compra <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
