import { formatPrice } from '../data';
import { useApp } from '../context/AppContext';

export function FavCards(){
    const { navigate, products, darkMode } = useApp();
    const featured = products.filter(p => p.featured).slice(0, 4);
    return(
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map(product => (
            <button
              key={product.id}
              onClick={() => navigate('product', product.id)}
              className="group text-left"
            >
              <div className={`aspect-[3/4] overflow-hidden relative ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <img
                  src={product.frontImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0"
                />
                <img
                  src={product.backImage}
                  alt={`${product.name} trasera`}
                  className="w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                />
                {product.discount && (
                  <span className={`absolute top-3 right-3 text-[10px] px-2 py-0.5 ${
                    darkMode ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    -{product.discount}%
                  </span>
                )}
              </div>
              <div className="mt-3 px-1">
                <p className={`text-xs tracking-wide ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{product.type}</p>
                <p className={`mt-0.5 text-sm ${darkMode ? 'text-white' : 'text-black'}`}>{product.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className={`text-xs line-through ${darkMode ? 'text-white/30' : 'text-black/30'}`}>{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
    )
}