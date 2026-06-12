import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatPrice } from '../../data';

export function Cart() {
  const { cart, isCartOpen, setCartOpen, removeFromCart, updateCartQty, navigate, cartTotal, getProduct, darkMode } = useApp();

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 z-50 flex flex-col shadow-2xl transition-all duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        } ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-5 border-b ${
          darkMode ? 'border-white/10' : 'border-black/10'
        }`}>
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} />
            <h2>Carrito</h2>
            <span className={`w-5 h-5 text-[10px] rounded-full flex items-center justify-center ${
              darkMode ? 'bg-white text-black' : 'bg-black text-white'
            }`}>
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className={`w-8 h-8 flex items-center justify-center transition-colors ${
              darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className={darkMode ? 'text-white/10 mb-4' : 'text-black/10 mb-4'} />
              <p className={`text-sm ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Tu carrito está vacío.</p>
              <button
                onClick={() => { setCartOpen(false); navigate('catalog'); }}
                className={`mt-4 text-sm underline ${darkMode ? 'hover:text-white/60' : 'hover:text-black/60'}`}
              >
                Ir a la tienda
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item, idx) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                const colorName = product.colorNames[product.colors.indexOf(item.color)] ?? item.color;
                return (
                  <div key={`${item.productId}-${item.size}-${item.color}-${idx}`} className="flex gap-4">
                    <div className={`w-20 h-24 flex-shrink-0 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      <img src={product.frontImage} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className={`text-xs mt-0.5 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
                            Talla: {item.size} · {colorName}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId, item.size, item.color)}
                          className={`ml-2 flex-shrink-0 ${
                            darkMode ? 'text-white/30 hover:text-white' : 'text-black/30 hover:text-black'
                          }`}
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className={`flex items-center border ${darkMode ? 'border-white/20' : 'border-black/20'}`}>
                          <button
                            onClick={() => {
                              if (item.quantity <= 1) removeFromCart(item.productId, item.size, item.color);
                              else updateCartQty(item.productId, item.size, item.color, item.quantity - 1);
                            }}
                            className={`w-7 h-7 flex items-center justify-center ${
                              darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                            }`}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQty(item.productId, item.size, item.color, item.quantity + 1)}
                            className={`w-7 h-7 flex items-center justify-center ${
                              darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                            }`}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-medium">{formatPrice(product.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className={`border-t px-6 py-5 space-y-4 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
            <div className="flex justify-between text-sm">
              <span className={darkMode ? 'text-white/60' : 'text-black/60'}>Subtotal</span>
              <span className="font-medium">{formatPrice(cartTotal)}</span>
            </div>
            <div className={`flex justify-between text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
              <span>Envío</span>
              <span>Calculado al finalizar</span>
            </div>
            <div className={`flex justify-between text-base border-t pt-3 ${
              darkMode ? 'border-white/10' : 'border-black/10'
            }`}>
              <span>Total estimado</span>
              <span className="font-medium">{formatPrice(cartTotal)}</span>
            </div>
            <button
              onClick={() => { setCartOpen(false); navigate('checkout'); }}
              className={`w-full py-4 text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${
                darkMode ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              Finalizar compra <ArrowRight size={16} />
            </button>
            <button
              onClick={() => { setCartOpen(false); navigate('catalog'); }}
              className={`w-full border py-3 text-sm tracking-wide transition-colors ${
                darkMode ? 'border-white/20 hover:border-white' : 'border-black/20 hover:border-black'
              }`}
            >
              Seguir comprando
            </button>
            <p className={`text-[11px] text-center ${darkMode ? 'text-white/30' : 'text-black/30'}`}>
              💳 Pago contra entrega · Sin cargos por adelantado
            </p>
          </div>
        )}
      </div>
    </>
  );
}
