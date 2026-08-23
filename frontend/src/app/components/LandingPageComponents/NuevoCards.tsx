import { formatPrice } from '../../data';
import { useApp } from '../../context/AppContext';
import { getProductCategoryLabel, getProductPrimaryImage, getMinVariantPrice } from '../productHelpers';

export function NuevoCards() {
    const { navigate, products, darkMode } = useApp();

    const byCollection = products.filter(p => getProductCategoryLabel(p) === 'Nuevo');
    const newItems = (byCollection.length >= 3
        ? byCollection
        : [...products].sort((a, b) =>
            new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
        )
    ).slice(0, 6);

    return (
        <>
            {newItems.length > 0 && (
                <section className={`py-20 px-4 sm:px-8 ${darkMode ? 'bg-black' : 'bg-white'}`}>
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-end justify-between mb-10">
                            <div>
                                <p className={`text-xs tracking-[0.3em] uppercase mb-2 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Nuevos</p>
                                <h2 className={`text-2xl sm:text-3xl ${darkMode ? 'text-white' : 'text-black'}`}>Nuevos Ingresos</h2>
                            </div>
                            <button
                                onClick={() => navigate('catalog')}
                                className={`text-xs tracking-wider border-b pb-0.5 transition-colors hidden sm:block ${darkMode
                                    ? 'text-white/40 border-white/20 hover:text-white hover:border-white'
                                    : 'text-black/40 border-black/20 hover:text-black hover:border-black'
                                }`}
                            >
                                Ver todo
                            </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {newItems.map(product => {
                                const imgUrl = getProductPrimaryImage(product);
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
                                        </div>
                                        <div className="mt-2">
                                            <p className={`text-xs mt-0.5 truncate ${darkMode ? 'text-white' : 'text-black'}`}>{product.name}</p>
                                            <span className={`text-xs font-medium ${darkMode ? 'text-white/70' : 'text-black/60'}`}>
                                                {formatPrice(getMinVariantPrice(product))}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

