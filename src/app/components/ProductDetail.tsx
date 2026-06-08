import { useState } from 'react';
import { Heart, ShoppingBag, Star, ChevronLeft, Share2, ArrowRight } from 'lucide-react';
import { useApp } from './AppContext';
import { formatPrice } from './data';

export function ProductDetail() {
  const { currentProductId, getProduct, navigate, addToCart, toggleWishlist, wishlist, darkMode } = useApp();
  const product = getProduct(currentProductId ?? '');

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="pt-24 flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-black/40 mb-4">Producto no encontrado.</p>
        <button onClick={() => navigate('catalog')} className="text-sm underline">
          Volver al catálogo
        </button>
      </div>
    );
  }

  const images = [product.frontImage, product.backImage];
  const isWishlisted = wishlist.includes(product.id);
  const color = selectedColor || product.colors[0];
  const stockForSize = selectedSize ? (product.stock[selectedSize] ?? 0) : null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart({ productId: product.id, size: selectedSize, color, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className={`flex items-center gap-2 text-xs mb-8 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
          <button onClick={() => navigate('landing')} className={darkMode ? 'hover:text-white' : 'hover:text-black'}>Inicio</button>
          <ChevronLeft size={12} className="rotate-180" />
          <button onClick={() => navigate('catalog')} className={darkMode ? 'hover:text-white' : 'hover:text-black'}>Tienda</button>
          <ChevronLeft size={12} className="rotate-180" />
          <span className={darkMode ? 'text-white' : 'text-black'}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-3">
            <div className={`aspect-[3/4] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <img
                src={images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-24 overflow-hidden border-2 transition-colors ${
                    activeImage === i ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className={`text-xs tracking-widest uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}` }>{product.gender} · {product.type} · {product.category}</p>
                <h1 className="mt-1">{product.name}</h1>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                    isWishlisted ? (darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black') : 'border-black/20 hover:border-black'
                  }`}
                  aria-label="Favoritos"
                >
                  <Heart size={16} className={isWishlisted ? 'fill-white' : ''} />
                </button>
                <button className="w-9 h-9 border border-black/20 hover:border-black flex items-center justify-center transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <Star
                    key={i}
                    size={12}
                    className={i <= Math.round(product.rating) ? (darkMode ? 'fill-white text-white' : 'fill-black text-black') : (darkMode ? 'text-white/20' : 'text-black/20')}
                  />
                ))}
              </div>
              <span className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}` }>{product.rating} ({product.reviews} reseñas)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className={`text-sm line-through ${darkMode ? 'text-white/30' : 'text-black/30'}` }>{formatPrice(product.originalPrice)}</span>
                  <span className={`text-xs px-2 py-0.5 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}` }>-{product.discount}%</span>
                </>
              )}
            </div>

            {/* Color */}
            <div className="mb-5">
              <p className="text-xs tracking-widest uppercase mb-2">
                Color: <span className={`${darkMode ? 'text-white/50' : 'text-black/50'}`}>{product.colorNames[product.colors.indexOf(color)] ?? product.colorNames[0]}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c}
                    title={product.colorNames[i]}
                    onClick={() => setSelectedColor(c)}
                    className={`w-7 h-7 rounded-full transition-all ${
                      color === c ? 'ring-2 ring-offset-2 ring-black scale-110' : 'hover:scale-110'
                    }`}
                    style={{
                      backgroundColor: c,
                      border: c === '#FFFFFF' ? '1px solid #ccc' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className={`text-xs tracking-widest uppercase ${sizeError ? 'text-red-500' : ''}`}>
                  {sizeError ? 'Selecciona una talla *' : 'Talla'}
                </p>
                <button className={`text-xs underline ${darkMode ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}` }>Guía de tallas</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => {
                  const inStock = (product.stock[s] ?? 0) > 0;
                  return (
                    <button
                      key={s}
                      onClick={() => { if (inStock) { setSelectedSize(s); setSizeError(false); } }}
                      disabled={!inStock}
                      className={`w-12 h-12 text-sm border transition-colors relative ${
                        selectedSize === s
                          ? (darkMode ? 'bg-white text-black border-white' : 'bg-black text-white border-black')
                          : inStock
                          ? (darkMode ? 'border-white/20 hover:border-white' : 'border-black/20 hover:border-black')
                          : 'border-black/10 text-black/20 cursor-not-allowed'
                      }`}
                    >
                      {s}
                      {!inStock && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="w-[130%] h-px bg-black/20 rotate-45 absolute" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              {selectedSize && stockForSize !== null && stockForSize <= 3 && stockForSize > 0 && (
                <p className={`text-xs mt-2 ${darkMode ? 'text-orange-300' : 'text-orange-500'}`}>¡Solo quedan {stockForSize} unidades!</p>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <p className="text-xs tracking-widest uppercase w-12">Cant.</p>
              <div className={`flex border ${darkMode ? 'border-white/20' : 'border-black/20'}`}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className={`w-10 h-10 flex items-center justify-center text-lg ${darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}` }
                >
                  −
                </button>
                <span className={`w-12 h-10 flex items-center justify-center text-sm border-l border-r ${darkMode ? 'border-white/20' : 'border-black/20'}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className={`w-10 h-10 flex items-center justify-center text-lg ${darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}` }
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-2 py-4 text-sm tracking-widest uppercase transition-colors mb-3 ${
                added
                  ? 'bg-green-600 text-white'
                  : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              <ShoppingBag size={18} />
              {added ? '¡Agregado al carrito!' : 'Agregar al carrito'}
            </button>

            <button
              onClick={() => {
                if (!selectedSize) { setSizeError(true); return; }
                addToCart({ productId: product.id, size: selectedSize, color, quantity });
                navigate('checkout');
              }}
              className={`flex items-center justify-center gap-2 py-4 text-sm tracking-widest uppercase border transition-colors mb-6 ${darkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}` }
            >
              Comprar ahora <ArrowRight size={16} />
            </button>

            {/* Description */}
            <div className={`border-t pt-5 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
              <p className={`text-xs tracking-widest uppercase mb-3 ${darkMode ? 'text-white/70' : 'text-black'}`}>Descripción</p>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-white/60' : 'text-black/60'}`}>{product.description}</p>
            </div>

            {/* Details */}
            <div className={`border-t mt-5 pt-5 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
              <div className={`grid grid-cols-2 gap-y-2 text-xs ${darkMode ? 'text-white' : 'text-black'}`}>
                <span className={`${darkMode ? 'text-white/40' : 'text-black/40'}`}>Longitud</span><span>{product.length}</span>
                <span className={`${darkMode ? 'text-white/40' : 'text-black/40'}`}>Tallas disponibles</span><span>{product.sizes.join(', ')}</span>
                <span className={`${darkMode ? 'text-white/40' : 'text-black/40'}`}>Colores</span><span>{product.colorNames.join(', ')}</span>
              </div>
            </div>

            {/* Shipping note */}
            <div className={`border p-4 mt-5 ${darkMode ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/2'}`}>
              <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
                💳 <strong>Pago contra entrega</strong> — Pagas cuando recibes tu pedido.<br />
                🚚 <strong>Envío a todo el país</strong> — Tiempo estimado: 3-5 días hábiles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
