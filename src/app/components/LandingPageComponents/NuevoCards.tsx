import { formatPrice } from '../../data';
import { useApp } from '../../context/AppContext';


export function NuevoCards() {
    const { navigate, products, darkMode } = useApp();
    const newItems = products.filter(p => p.category === 'NUEVO').slice(0, 3);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {newItems.map(product => (
            <button
              key={product.id}
              onClick={() => navigate('product', product.id)}
              className="group text-left"
            >
              <div className={`aspect-[3/4] overflow-hidden relative ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <img
                  src={product.frontImage}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-3 left-3 text-[10px] tracking-widest px-2 py-1 ${
                  darkMode ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                  NUEVO
                </span>
              </div>
              <div className="mt-3">
                <p className={`text-xs tracking-wide ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{product.gender} · {product.type}</p>
                <p className={`mt-0.5 text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>{product.name}</p>
                <p className={`mt-1 text-sm ${darkMode ? 'text-white' : 'text-black'}`}>{formatPrice(product.price)}</p>
              </div>
            </button>
          ))}
        </div>
    )
}