import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { useState } from 'react';
import HeroImage1 from '../../../../../assets/Hero1.png';
import HeroImage2 from '../../../../../assets/Hero2.png';
import HeroImage3 from '../../../../../assets/Hero3.png';

const HERO_SLIDES = [
  {
    image: HeroImage1,
    title: 'Nueva Colección',
    subtitle: 'Diseño contemporáneo con carácter atemporal. Prendas pensadas para destacar.',
    cta: 'Explorar colección',
    tag: 'Temporada 2026',
  },
  {
    image: HeroImage2,
    title: 'Esenciales Urbanos',
    subtitle: 'Cortes limpios y materiales seleccionados para el día a día.',
    cta: 'Ver prendas',
    tag: 'Edición limitada',
  },
  {
    image: HeroImage3,
    title: 'Siluetas Minimalistas',
    subtitle: 'La sofisticación de lo simple. Viste con personalidad y elegancia.',
    cta: 'Descubrir más',
    tag: 'Tendencia',
  },
];

export function HeroSlides() {
  const { navigate } = useApp();
  const [slide, setSlide] = useState(0);

  return (
    <section className="relative h-[85vh] min-h-[500px] max-h-[750px] overflow-hidden bg-black">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === slide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full">
              <div className="max-w-lg text-white">
                <span className="text-xs tracking-[0.4em] uppercase text-white/70 mb-3 block">
                  {s.tag}
                </span>
                <h1 className="text-4xl sm:text-6xl tracking-tight mb-4 font-light leading-tight">
                  {s.title}
                </h1>
                <p className="text-sm sm:text-base text-white/80 mb-8 leading-relaxed font-light">
                  {s.subtitle}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate('catalog')}
                    className="flex items-center gap-2 bg-white text-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                  >
                    {s.cta} <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => navigate('catalog')}
                    className="flex items-center gap-2 border border-white text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
                  >
                    Ver todo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`transition-all ${i === slide ? 'w-8 h-1.5 bg-white' : 'w-2 h-1.5 bg-white/40'}`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setSlide((slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 flex items-center justify-center backdrop-blur-sm transition-colors text-white"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={() => setSlide((slide + 1) % HERO_SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 flex items-center justify-center backdrop-blur-sm transition-colors text-white"
        aria-label="Slide siguiente"
      >
        <ChevronRight size={20} />
      </button>
    </section>
  );
}
