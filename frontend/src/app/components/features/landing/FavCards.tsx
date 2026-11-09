import { formatPrice } from '../../../data';
import { useApp } from '../../../context/AppContext';
import { getProductDiscount, getProductPrimaryImage, getProductCategoryLabel, getMinVariantPrice } from '../../../utils/productHelpers';
import type { Product } from '../../../types';

export function FavCards(){
    const { navigate, products, darkMode } = useApp();
    const featured = products.filter((p: Product) => p.is_featured).slice(0, 4);
    return (
        <section className={`py-20 px-4 sm:px-8 ${darkMode ? 'bg-black' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className={`text-xs tracking-[0.3em] uppercase mb-2 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Destacados</p>
                        <h2 className={`text-2xl sm:text-3xl ${darkMode ? 'text-white' : 'text-black'}`}>Productos Destacados</h2>
                    </div>
                    <button
                        onClick={() => navigate('catalog')}
                        className={`text-xs tracking-wider border-b pb-0.5 transition-colors hidden sm:block ${darkMode ? 'text-white/40 border-white/20 hover:text-white hover:border-white' : 'text-black/40 border-black/20 hover:text-black hover:border-black'
                        }`}
                    >
                        Ver todo
                    </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {featured.map((product: Product) => {
                        const imgUrl = getProductPrimaryImage(product);
                        const discount = getProductDiscount(product);
                        const categoryLabel = getProductCategoryLabel(product);
                        return (
                            <div
                                key={product.id}
                                onClick={() => navigate('product', String(product.id))}
                                className="group cursor-pointer"
                            >
                                <div className={`relative aspect-[3/4] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                                    {imgUrl ? (
                                        <img src={imgUrl} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-black/20">Sin imagen</div>
                                    )}
                                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                                        {categoryLabel && (
                                            <span className={`text-[9px] tracking-widest px-2 py-1 uppercase ${darkMode ? 'bg-white text-black' : 'bg-black text-white'
                                            }`}>{categoryLabel}</span>
                                        )}
                                        {discount && <span className={`text-[9px] tracking-widest px-2 py-1 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>-{discount}%</span>}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className={`text-[11px] tracking-wide uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{product.gender} · {product.type ?? 'General'}</p>
                                    <p className={`text-sm mt-0.5 ${darkMode ? 'text-white' : 'text-black'}`}>{product.name}</p>
                                    <span className={`text-sm font-medium mt-1 block ${darkMode ? 'text-white' : 'text-black'}`}>
                                        {formatPrice(getMinVariantPrice(product))}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
