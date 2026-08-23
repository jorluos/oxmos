import { useState, useMemo } from 'react';
import type { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  getProductImages,
  getProductColors,
  getProductSizes,
  getProductStockBySize,
  getProductDiscount,
  getProductCategoryLabel,
  getMinVariantPrice,
} from '../productHelpers';

export function useProductDetail(product?: Product) {
  const { addToCart, navigate, wishlist } = useApp();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColorHex, setSelectedColorHex] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const [added, setAdded] = useState(false);

  const images = useMemo(() => (product ? getProductImages(product) : []), [product]);
  const colors = useMemo(() => (product ? getProductColors(product) : []), [product]);
  const sizes = useMemo(() => (product ? getProductSizes(product) : []), [product]);
  const stockBySize = useMemo(() => (product ? getProductStockBySize(product) : {}), [product]);
  const discount = useMemo(() => (product ? getProductDiscount(product) : 0), [product]);
  const categoryLabel = useMemo(() => (product ? getProductCategoryLabel(product) : ''), [product]);
  const minVariantPrice = useMemo(() => (product ? getMinVariantPrice(product) : 0), [product]);

  const isWishlisted = product ? wishlist.includes(product.id as number) : false;
  const currentColorHex = selectedColorHex || colors[0]?.hex || '';
  const currentColorName = colors.find(c => c.hex === currentColorHex)?.name || colors[0]?.name || '';
  const stockForSize = selectedSize ? (stockBySize[selectedSize] ?? 0) : null;

  const selectedVariant = useMemo(() => {
    if (!product || !selectedSize) return null;

    return (
      product.variants?.find(
        v => v.size === selectedSize && (!currentColorHex || v.color_hex === currentColorHex)
      ) ?? null
    );
  }, [product, selectedSize, currentColorHex]);

  const handleAddToCart = async () => {
    if (!product) return;
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    const variant = selectedVariant ?? product.variants?.find(v => v.size === selectedSize);
    if (!variant) return;

    setSizeError(false);
    await addToCart(product.id as number, variant.id, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    const variant = selectedVariant ?? product.variants?.find(v => v.size === selectedSize && v.is_active);
    if (!variant) return;
    addToCart(product.id as number, variant.id, quantity);
    navigate('checkout');
  };

  const displayPrice = selectedVariant?.price ?? minVariantPrice;
  const displayOriginalPrice = selectedVariant?.compare_at_price ?? product?.original_price;

  return {
    selectedSize,
    setSelectedSize,
    selectedColorHex,
    setSelectedColorHex,
    quantity,
    setQuantity,
    activeImage,
    setActiveImage,
    sizeError,
    setSizeError,
    added,
    images,
    colors,
    sizes,
    stockBySize,
    discount,
    categoryLabel,
    isWishlisted,
    currentColorHex,
    currentColorName,
    stockForSize,
    selectedVariant,
    displayPrice,
    displayOriginalPrice,
    handleAddToCart,
    handleBuyNow,
  };
}
