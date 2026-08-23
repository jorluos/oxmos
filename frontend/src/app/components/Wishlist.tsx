import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export function Wishlist() {
  const { wishlist, products, navigate, darkMode } = useApp();
  const items = products.filter(p => wishlist.includes(p.id));

  return (
    <div className={`pt-16 min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className={`text-xs tracking-[0.4em] uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Mi cuenta</span>
            <h1 className="mt-1 flex items-center gap-2">
              Lista de deseos
              {items.length > 0 && (
                <span className={`text-sm font-normal ${darkMode ? 'text-white/40' : 'text-black/40'}`}>({items.length})</span>
              )}
            </h1>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Heart size={64} className={darkMode ? 'text-white/10 mb-6' : 'text-black/10 mb-6'} strokeWidth={1} />
            <h2 className="mb-2">Tu lista de deseos está vacía</h2>
            <p className={`text-sm max-w-sm ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
              Agrega prendas a tu lista de deseos tocando el ícono de corazón en cada producto.
            </p>
            <button
              onClick={() => navigate('catalog')}
              className={`mt-8 px-10 py-3 text-sm tracking-widest uppercase transition-colors ${darkMode ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-black/80'}`}
            >
              Ir a la tienda
            </button>
          </div>
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

