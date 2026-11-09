import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../../context/AppContext';

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
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
    const next = () => setCurrent((current + 1) % TESTIMONIALS.length);

    return (
        <section className={`py-20 px-4 sm:px-8 ${darkMode ? 'bg-black' : 'bg-white'}`}>
            <div className="max-w-3xl mx-auto text-center">
                <Quote size={32} className={`mx-auto mb-6 ${darkMode ? 'text-white/20' : 'text-black/20'}`} />
                <div className="min-h-[120px] flex items-center justify-center">
                    <p className={`text-lg sm:text-xl font-light italic leading-relaxed ${darkMode ? 'text-white/80' : 'text-black/80'}`}>
                        "{TESTIMONIALS[current].text}"
                    </p>
                </div>
                <div className="mt-6">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>{TESTIMONIALS[current].name}</p>
                    <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{TESTIMONIALS[current].city}</p>
                </div>

                {/* Rating stars */}
                <div className="flex justify-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={prev}
                        className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                            darkMode ? 'border-white/20 hover:border-white text-white' : 'border-black/20 hover:border-black text-black'
                        }`}
                        aria-label="Testimonio anterior"
                    >
                        <ChevronLeft size={16} />
                    </button>
                    <span className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
                        {current + 1} / {TESTIMONIALS.length}
                    </span>
                    <button
                        onClick={next}
                        className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                            darkMode ? 'border-white/20 hover:border-white text-white' : 'border-black/20 hover:border-black text-black'
                        }`}
                        aria-label="Testimonio siguiente"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </section>
    );
}
