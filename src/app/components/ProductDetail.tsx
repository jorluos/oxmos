import { useState, useMemo } from 'react';
import { Heart, ShoppingBag, Star, ChevronLeft, Share2, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data';
import {
  getProductImages,
  getProductColors,
  getProductSizes,
  getProductStockBySize,
  getProductDiscount,
  getProductCategoryLabel,
  getMinVariantPrice,
} from './productHelpers';

export function ProductDetail() {
  const { currentProductId, getProduct, navigate, addToCart, toggleWishlist, wishlist, darkMode } = useApp();
  const product = getProduct(currentProductId ?? '');

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColorHex, setSelectedColorHex] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const images = useMemo(() => getProductImages(product!), [product]);
  const colors = useMemo(() => getProductColors(product!), [product]);
  const sizes = useMemo(() => getProductSizes(product!), [product]);
  const stockBySize = useMemo(() => getProductStockBySize(product!), [product]);
  const discount = useMemo(() => getProductDiscount(product!), [product]);
  const categoryLabel = useMemo(() => getProductCategoryLabel(product!), [product]);
  const minVariantPrice = useMemo(() => getMinVariantPrice(product!), [product]);

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

  const isWishlisted = wishlist.includes(product.id as number);
  const currentColorHex = selectedColorHex || colors[0]?.hex || '';
  const currentColorName = colors.find(c => c.hex === currentColorHex)?.name || colors[0]?.name || '';
  const stockForSize = selectedSize ? (stockBySize[selectedSize] ?? 0) : null;

  // Encontrar la variante que coincide con talla y color seleccionados
  const selectedVariant = useMemo(() => {
    if (!selectedSize) return null;
    return product.variants?.find(v =>
      v.is_active &&
      v.size === selectedSize &&
      (!currentColorHex || v.color_hex === currentColorHex)
    ) ?? null;
  }, [product, selectedSize, currentColorHex]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    const variant = selectedVariant ?? product.variants?.find(v => v.size === selectedSize && v.is_active);
    if (!variant) return;
    setSizeError(false);
    addToCart(product.id as number, variant.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { setSizeError(true); return; }
    const variant = selectedVariant ?? product.variants?.find(v => v.size === selectedSize && v.is_active);
    if (!variant) return;
    addToCart(product.id as number, variant.id, quantity);
    navigate('checkout');
  };

  // Precio a mostrar: el de la variante seleccionada, o el mínimo de variantes, o base_price
  const displayPrice = selectedVariant?.price ?? minVariantPrice;
  const displayOriginalPrice = selectedVariant?.compare_at_price ?? product.original_price;

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
              {images.length > 0 ? (
                <img
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-black/20">Sin imagen</div>
              )}
            </div>
            {images.length > 1 && (
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
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className={`text-xs tracking-widest uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
                  {product.gender} · {product.type ?? 'General'}
                  {categoryLabel ? ` · ${categoryLabel}` : ''}
                </p>
                <h1 className="mt-1">{product.name}</h1>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleWishlist(product.id as number)}
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
            {product.raiting_average > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star
                      key={i}
                      size={12}
                      className={i <= Math.round(product.raiting_average) ? (darkMode ? 'fill-white text-white' : 'fill-black text-black') : (darkMode ? 'text-white/20' : 'text-black/20')}
                    />
                  ))}
                </div>
                <span className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
                  {product.raiting_average} ({product.reviews_count} reseñas)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-2xl font-medium">{formatPrice(displayPrice)}</span>
              {displayOriginalPrice && displayOriginalPrice > displayPrice && (
                <>
                  <span className={`text-sm line-through ${darkMode ? 'text-white/30' : 'text-black/30'}`}>{formatPrice(displayOriginalPrice)}</span>
                  {discount && <span className={`text-xs px-2 py-0.5 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>-{discount}%</span>}
                </>
              )}
            </div>

            {/* Color */}
            {colors.length > 0 && (
              <div className="mb-5">
                <p className="text-xs tracking-widest uppercase mb-2">
                  Color: <span className={`${darkMode ? 'text-white/50' : 'text-black/50'}`}>{currentColorName}</span>
                </p>
                <div className="flex gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.hex}
                      title={c.name}
                      onClick={() => setSelectedColorHex(c.hex)}
                      className={`w-7 h-7 rounded-full transition-all ${
                        currentColorHex === c.hex ? 'ring-2 ring-offset-2 ring-black scale-110' : 'hover:scale-110'
                      }`}
                      style={{
                        backgroundColor: c.hex,
                        border: c.hex === '#FFFFFF' ? '1px solid #ccc' : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-xs tracking-widest uppercase ${sizeError ? 'text-red-500' : ''}`}>
                    {sizeError ? 'Selecciona una talla *' : 'Talla'}
                  </p>
                  <button className={`text-xs underline ${darkMode ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`}>Guía de tallas</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map(s => {
                    const inStock = (stockBySize[s] ?? 0) > 0;
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
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <p className="text-xs tracking-widest uppercase w-12">Cant.</p>
              <div className={`flex border ${darkMode ? 'border-white/20' : 'border-black/20'}`}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className={`w-10 h-10 flex items-center justify-center text-lg ${darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
                >
                  −
                </button>
                <span className={`w-12 h-10 flex items-center justify-center text-sm border-l border-r ${darkMode ? 'border-white/20' : 'border-black/20'}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className={`w-10 h-10 flex items-center justify-center text-lg ${darkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}
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
              onClick={handleBuyNow}
              className={`flex items-center justify-center gap-2 py-4 text-sm tracking-widest uppercase border transition-colors mb-6 ${darkMode ? 'border-white text-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}`}
            >
              Comprar ahora <ArrowRight size={16} />
            </button>

            {/* Description */}
            {product.short_description && (
              <div className={`border-t pt-5 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
                <p className={`text-xs tracking-widest uppercase mb-3 ${darkMode ? 'text-white/70' : 'text-black'}`}>Descripción</p>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-white/60' : 'text-black/60'}`}>{product.short_description}</p>
              </div>
            )}

            {/* Details */}
            {(product.material || product.brand || product.care_instructions) && (
              <div className={`border-t mt-5 pt-5 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
                <div className={`grid grid-cols-2 gap-y-2 text-xs ${darkMode ? 'text-white' : 'text-black'}`}>
                  {product.brand && <><span className={`${darkMode ? 'text-white/40' : 'text-black/40'}`}>Marca</span><span>{product.brand}</span></>}
                  {product.material && <><span className={`${darkMode ? 'text-white/40' : 'text-black/40'}`}>Material</span><span>{product.material}</span></>}
                  {sizes.length > 0 && <><span className={`${darkMode ? 'text-white/40' : 'text-black/40'}`}>Tallas</span><span>{sizes.join(', ')}</span></>}
                  {colors.length > 0 && <><span className={`${darkMode ? 'text-white/40' : 'text-black/40'}`}>Colores</span><span>{colors.map(c => c.name).join(', ')}</span></>}
                  {product.gender && <><span className={`${darkMode ? 'text-white/40' : 'text-black/40'}`}>Género</span><span>{product.gender}</span></>}
                </div>
                {product.care_instructions && (
                  <div className="mt-3">
                    <span className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Cuidados: </span>
                    <span className={`text-xs ${darkMode ? 'text-white/60' : 'text-black/60'}`}>{product.care_instructions}</span>
                  </div>
                )}
              </div>
            )}

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