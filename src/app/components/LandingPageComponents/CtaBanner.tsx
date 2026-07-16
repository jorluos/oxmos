import { ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function CtaBanner() {
    const { navigate, darkMode } = useApp();
    return (
        <section className={`py-20 px-4 sm:px-8 ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            <div className="max-w-7xl mx-auto text-center">
                <p className={`text-xs tracking-[0.3em] uppercase mb-3 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>#OxmosStyle</p>
                <h2 className={`text-2xl sm:text-4xl mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>Descubre tu estilo</h2>
                <p className={`text-sm max-w-md mx-auto mb-8 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
                    Explora nuestra colección completa y encuentra las prendas que definen tu personalidad.
                </p>
                <button
                    onClick={() => navigate('catalog')}
                    className={`inline-flex items-center gap-2 px-8 py-3 text-sm tracking-widest uppercase transition-colors ${
                        darkMode ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-black/80'
                    }`}
                >
                    Ir a la tienda <ArrowRight size={16} />
                </button>
            </div>
        </section>
    );
}
