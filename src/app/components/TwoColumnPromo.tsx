import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';

export function TwoColumnPromo() {
    const { navigate } = useApp();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className="relative h-72 sm:h-96 overflow-hidden bg-black cursor-pointer group"
            onClick={() => navigate('catalog')}
          >
            <img
              src="https://images.unsplash.com/photo-1769103638527-3240c2f5d4ad?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=700&h=500&q=80"
              alt="Mujer"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-1">Colección</p>
              <h3 className="text-2xl text-white">Mujer</h3>
              <span className="flex items-center gap-1 text-sm mt-2 underline underline-offset-4">
                Explorar <ArrowRight size={14} />
              </span>
            </div>
          </div>
          <div
            className="relative h-72 sm:h-96 overflow-hidden bg-black cursor-pointer group"
            onClick={() => navigate('catalog')}
          >
            <img
              src="https://images.unsplash.com/photo-1731505583021-16c3a17339cd?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=700&h=500&q=80"
              alt="Hombre"
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <p className="text-xs tracking-[0.3em] uppercase text-white/60 mb-1">Colección</p>
              <h3 className="text-2xl text-white">Hombre</h3>
              <span className="flex items-center gap-1 text-sm mt-2 underline underline-offset-4">
                Explorar <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </div>
    )
}