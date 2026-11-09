import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { WishlistEmpty } from '../components/features/wishlist/WishlistEmpty';

export function WishlistPage() {
  const { wishlist, products, navigate, darkMode } = useApp();
  const items = products.filter(p => wishlist.includes(p.id));

  return (
    <div className={`pt-16 min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className={`text-xs tracking-[0.4em] uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
              Mi cuenta
            </span>
            <h1 className="mt-1 flex items-center gap-2 text-2xl sm:text-3xl font-light">
              Lista de deseos
              {items.length > 0 && (
                <span className={`text-sm font-normal ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
                  ({items.length})
                </span>
              )}
            </h1>
          </div>
        </div>

        {items.length === 0 ? (
          <WishlistEmpty darkMode={darkMode} onExplore={() => navigate('catalog')} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {items.map(product => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export { WishlistPage as Wishlist };
