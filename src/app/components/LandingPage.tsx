import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NuevoCards } from './NuevoCards';
import { FavCards } from './FavCards';
import { TwoColumnPromo } from './TwoColumnPromo';
import { NewsLetter } from './NewsLetter';
import { HeroSlides } from './HeroSlides';
import { BigBanner } from './BigBanner';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1771591485611-45264af86618?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=1400&h=800&q=80',
    tag: 'NUEVA COLECCIÓN',
    title: 'Define Tu\nEstilo Propio',
    subtitle: 'Prendas que hablan por ti. Moda contemporánea con alma.',
  },
  {
    image: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=1400&h=800&q=80',
    tag: 'COLECCIÓN HOMBRE',
    title: 'Elegancia\nSin Tiempo',
    subtitle: 'Trajes y abrigos para el hombre que marca la diferencia.',
  },
  {
    image: 'https://images.unsplash.com/photo-1769103638527-3240c2f5d4ad?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=1400&h=800&q=80',
    tag: 'TENDENCIAS',
    title: 'Vive La\nModa Ahora',
    subtitle: 'Las últimas tendencias en tus manos. Envío a todo el país.',
  },
];

const FEATURES = [
  { icon: '🚚', title: 'Envío Nacional', desc: 'Llegamos a toda Colombia.' },
  { icon: '💳', title: 'Pago Contra Entrega', desc: 'Pagas cuando recibes tu pedido. Sin riesgos.' },
  { icon: '↩️', title: 'Cambios Gratis', desc: 'Hasta 15 días para cambiar de talla o estilo.' },
  { icon: '✅', title: 'Calidad Garantizada', desc: 'Materiales premium seleccionados con cuidado.' },
];

export function LandingPage() {
  const { navigate, products, darkMode } = useApp();
  const newItems = products.filter(p => p.category === 'NUEVO').slice(0, 3);

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Hero Slider */}
      <HeroSlides HERO_SLIDES={HERO_SLIDES} />
      {/* Features strip */}
      <section className={`py-8 transition-colors ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="text-sm font-medium tracking-wide">{f.title}</p>
                  <p className={`text-xs mt-0.5 ${darkMode ? 'text-black/40' : 'text-white/40'}`}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section divider: NUEVO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className={`text-xs tracking-[0.4em] uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Recién llegado</span>
            <h2 className={`mt-1 ${darkMode ? 'text-white' : 'text-black'}`}>Lo Más Nuevo</h2>
          </div>
          <button
            onClick={() => navigate('catalog')}
            className={`flex items-center gap-1 text-sm tracking-wide border-b pb-0.5 hover:opacity-60 transition-opacity ${
              darkMode ? 'border-white text-white' : 'border-black text-black'
            }`}
          >
            Ver todo <ArrowRight size={14} />
          </button>
        </div>
        <NuevoCards products={newItems} /> {/* Componente separado para los nuevos productos */}
      </section>

      {/* Big editorial banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BigBanner />
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className={`text-xs tracking-[0.4em] uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Destacados</span>
            <h2 className={`mt-1 ${darkMode ? 'text-white' : 'text-black'}`}>Favoritos del Momento</h2>
          </div>
          <button
            onClick={() => navigate('catalog')}
            className={`flex items-center gap-1 text-sm tracking-wide border-b pb-0.5 hover:opacity-60 transition-opacity ${
              darkMode ? 'border-white text-white' : 'border-black text-black'
            }`}
          >
            Ver todo <ArrowRight size={14} />
          </button>
        </div>
        <FavCards /> {/* Componente separado para los productos destacados */}
      </section>

      {/* Two column promo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <TwoColumnPromo />
      </section>
      
      {/* Newsletter */}
      <section className="py-20 px-4 bg-[#08080861]">
        <NewsLetter />
      </section>
    </div>
  );
}