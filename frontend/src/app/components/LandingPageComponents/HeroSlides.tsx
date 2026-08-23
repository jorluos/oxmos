import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useState } from 'react';
import HeroImage1 from '../../../../assets/Hero1.png';
import HeroImage2 from '../../../../assets/Hero2.png';
import HeroImage3 from '../../../../assets/Hero3.png';

const HERO_SLIDES = [
  {
    image: HeroImage1,
    tag: 'NUEVA COLECCIÓN',
    title: 'Define Tu\nEstilo Propio',
    subtitle: 'Prendas que reflejan tu esencia. Diseños contemporáneos para cada ocasión.',
  },
  {
    image: HeroImage2,
    tag: 'ELEGANCIA DIARIA',
    title: 'Sofisticación\nNatural',
    subtitle: 'Descubre piezas versátiles que combinan comodidad, estilo y calidad.',
  },
  {
    image: HeroImage3,
    tag: 'TENDENCIAS',
    title: 'Inspira Tu\nPróximo Look',
    subtitle: 'Renueva tu guardarropa con las últimas tendencias de la temporada.',
  },
];

export function HeroSlides() {
  const { navigate } = useApp();
  const [slide, setSlide] = useState(0);

  return (
    <section className="relative h-screen overflow-hidden">
      {HERO_SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={s.image} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </div>
      ))}

        <div className="relative z-10 h-full flex flex-col justify-center px-8 sm:px-16 max-w-7xl mx-auto">
          <span className="text-white/60 text-xs tracking-[0.4em] uppercase mb-4">
            {HERO_SLIDES[slide].tag}
          </span>
          <h1 className="text-5xl sm:text-7xl text-white leading-tight whitespace-pre-line mb-6">
            {HERO_SLIDES[slide].title}
          </h1>
          <p className="text-white/70 text-lg max-w-md mb-10">
            {HERO_SLIDES[slide].subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate('catalog-gender')}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
            >
              Explorar Colección <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('catalog')}
              className="flex items-center gap-2 border border-white text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
            >
              Ver Ofertas
            </button>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`transition-all ${i === slide ? 'w-8 h-1.5 bg-white' : 'w-2 h-1.5 bg-white/40'}`}
            />
          ))}
        </div>

        {/* Slide controls */}
        <button
          onClick={() => setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button
          onClick={() => setSlide(s => (s + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 hover:bg-white/40 flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </section>
  );
}
