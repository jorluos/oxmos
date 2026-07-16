import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const TESTIMONIALS = [
    {
        text: 'La calidad superó lo que esperaba y la entrega fue rápida. Voy a comprar otra vez.',
        name: 'Laura Méndez',
        city: 'Bogotá',
    },
    {
        text: 'El proceso de compra fue claro y el pedido llegó tal cual se veía en la tienda.',
        name: 'Camilo Rojas',
        city: 'Medellín',
    },
    {
        text: 'Muy buena atención y prendas con un acabado excelente. Se nota el cuidado en cada detalle.',
        name: 'Daniela Torres',
        city: 'Cali',
    },
];

export function Testimonials() {
    const { darkMode } = useApp();
    const [idx, setIdx] = useState(0);

    return (
        <section className={`py-20 px-4 sm:px-8 ${darkMode ? 'bg-black' : 'bg-white'}`}>
            <div className="max-w-3xl mx-auto text-center">
                <Quote size={32} className={`mx-auto mb-6 ${darkMode ? 'text-white/20' : 'text-black/20'}`} />
                <p className={`text-lg sm:text-xl leading-relaxed mb-6 ${darkMode ? 'text-white/80' : 'text-black/70'}`}>
                    "{TESTIMONIALS[idx].text}"
                </p>
                <div className="flex items-center justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} size={14} className={darkMode ? 'fill-white text-white' : 'fill-black text-black'} />
                    ))}
                </div>
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>{TESTIMONIALS[idx].name}</p>
                <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{TESTIMONIALS[idx].city}</p>
                <div className="flex justify-center gap-3 mt-6">
                    <button
                        onClick={() => setIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                        className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                            darkMode ? 'border-white/20 hover:border-white text-white' : 'border-black/20 hover:border-black text-black'
                        }`}
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <button
                        onClick={() => setIdx(i => (i + 1) % TESTIMONIALS.length)}
                        className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                            darkMode ? 'border-white/20 hover:border-white text-white' : 'border-black/20 hover:border-black text-black'
                        }`}
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}
