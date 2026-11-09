import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useProductDetail } from '../components/features/product-detail/useProductDetail';
import { ProductGallery } from '../components/features/product-detail/ProductGallery';
import { ProductOptions } from '../components/features/product-detail/ProductOptions';
import { ProductSpecs } from '../components/features/product-detail/ProductSpecs';

export function ProductDetailPage() {
  const { currentProductId, getProduct, navigate, toggleWishlist, darkMode } = useApp();
  const product = getProduct(currentProductId ?? '');

  const {
    selectedSize,
    setSelectedSize,
    selectedColorHex,
    setSelectedColorHex,
    quantity,
    setQuantity,
    activeImage,
    setActiveImage,
    sizeError,
    added,
    images,
    colors,
    sizes,
    stockBySize,
    discount,
    isWishlisted,
    currentColorHex,
    currentColorName,
    stockForSize,
    displayPrice,
    displayOriginalPrice,
    handleAddToCart,
    handleBuyNow,
  } = useProductDetail(product);

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

  return (
    <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className={`flex items-center gap-2 text-xs mb-8 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
          <button onClick={() => navigate('landing')} className={darkMode ? 'hover:text-white' : 'hover:text-black'}>
            Inicio
          </button>
          <ChevronLeft size={12} className="rotate-180" />
          <button onClick={() => navigate('catalog')} className={darkMode ? 'hover:text-white' : 'hover:text-black'}>
            Tienda
          </button>
          <ChevronLeft size={12} className="rotate-180" />
          <span className={darkMode ? 'text-white' : 'text-black'}>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Visual Gallery */}
          <ProductGallery
            images={images}
            productName={product.name}
            activeImage={activeImage}
            onSelectImage={setActiveImage}
            darkMode={darkMode}
          />

          {/* Options and Specs */}
          <div className="space-y-6">
            <ProductOptions
              product={product}
              colors={colors}
              sizes={sizes}
              stockBySize={stockBySize}
              selectedSize={selectedSize}
              selectedColorHex={selectedColorHex}
              currentColorHex={currentColorHex}
              currentColorName={currentColorName}
              quantity={quantity}
              sizeError={sizeError}
              added={added}
              isWishlisted={isWishlisted}
              displayPrice={displayPrice}
              displayOriginalPrice={displayOriginalPrice}
              discount={discount}
              stockForSize={stockForSize}
              darkMode={darkMode}
              onSelectColor={setSelectedColorHex}
              onSelectSize={setSelectedSize}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              onToggleWishlist={() => toggleWishlist(product.id as number)}
            />

            <ProductSpecs
              product={product}
              sizes={sizes}
              colors={colors}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductDetailPage as ProductDetail };
