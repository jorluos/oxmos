import { Heart } from 'lucide-react';

interface WishlistEmptyProps {
  darkMode: boolean;
  onExplore: () => void;
}

export function WishlistEmpty({ darkMode, onExplore }: WishlistEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Heart size={64} className={darkMode ? 'text-white/10 mb-6' : 'text-black/10 mb-6'} strokeWidth={1} />
      <h2 className="mb-2">Tu lista de deseos está vacía</h2>
      <p className={`text-sm max-w-sm ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
        Agrega prendas a tu lista de deseos tocando el ícono de corazón en cada producto.
      </p>
      <button
        onClick={onExplore}
        className={`mt-8 px-10 py-3 text-sm tracking-widest uppercase transition-colors ${
          darkMode ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-black/80'
        }`}
      >
        Ir a la tienda
      </button>
    </div>
  );
}
