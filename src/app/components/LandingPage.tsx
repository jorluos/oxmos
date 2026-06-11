import { useState, useEffect } from 'react';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data';

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

const TESTIMONIALS = [
  { name: 'Valentina M.', city: 'Bogotá', text: 'La calidad de las prendas es excepcional. El envío fue rápido y el pago contra entrega me dio mucha confianza.', rating: 5 },
  { name: 'Andrés P.', city: 'Medellín', text: 'Compré el traje negro y quedé impresionado. El talle es perfecto y el servicio al cliente por WhatsApp fue excelente.', rating: 5 },
  { name: 'Carolina R.', city: 'Cali', text: 'Mi vestido llegó exactamente como en las fotos. La atención fue rápida y el cambio de talla fue sin problema.', rating: 5 },
];

const FEATURES = [
  { icon: '🚚', title: 'Envío Nacional', desc: 'Llegamos a toda Colombia. Seguimiento en tiempo real.' },
  { icon: '💳', title: 'Pago Contra Entrega', desc: 'Pagas cuando recibes tu pedido. Sin riesgos.' },
  { icon: '↩️', title: 'Cambios Gratis', desc: 'Hasta 30 días para cambiar de talla o estilo.' },
  { icon: '✅', title: 'Calidad Garantizada', desc: 'Materiales premium seleccionados con cuidado.' },
];

export function LandingPage() {
  const { navigate, products, darkMode } = useApp();
  const [slide, setSlide] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const featured = products.filter(p => p.featured).slice(0, 4);
  const newItems = products.filter(p => p.category === 'NUEVO').slice(0, 3);

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-black' : 'bg-white'}`}>
      {/* Hero Slider */}
      <section className="relative h-screen overflow-hidden">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={s.image} alt="" className="w-full h-full object-cover" />
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
              onClick={() => navigate('catalog')}
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
      </section>

      {/* Big editorial banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className={`relative h-96 sm:h-[500px] overflow-hidden ${darkMode ? 'bg-white' : 'bg-black'}`}>
          <img
            src="https://images.unsplash.com/photo-1666932521131-d990bd263a2c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=1400&h=600&q=80"
            alt="Editorial"
            className="w-full h-full object-cover opacity-70"
          />
          <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 ${
            darkMode ? 'text-black' : 'text-white'
          }`}>
            <span className={`text-xs tracking-[0.5em] uppercase mb-3 ${darkMode ? 'text-black/60' : 'text-white/60'}`}>Tendencia de la temporada</span>
            <h2 className={`text-4xl sm:text-6xl mb-6 ${darkMode ? 'text-black' : 'text-white'}`}>Elegancia Oscura</h2>
            <button
              onClick={() => navigate('catalog')}
              className={`px-10 py-3 text-sm tracking-widest uppercase border transition-colors ${
                darkMode
                  ? 'bg-black text-white hover:bg-white hover:text-black border-black'
                  : 'bg-white text-black hover:bg-black hover:text-white border-white'
              }`}
            >
              Descubrir
            </button>
          </div>
        </div>
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
      </section>

      {/* Two column promo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
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
      </section>

      {/* Testimonials */}
      

      {/* Newsletter */}
      <section className="py-20 px-4 bg-[#08080861]">
        <div className="max-w-xl mx-auto text-center">
          <span className={`text-xs tracking-[0.4em] uppercase mb-3 block ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Newsletter</span>
          <h2 className={`mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>Sé el Primero en Saber</h2>
          <p className={`text-sm mb-8 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
            Recibe novedades, descuentos exclusivos y tendencias directamente en tu correo.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              alert('¡Gracias por suscribirte!');
            }}
          >
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className={`flex-1 border px-4 py-3 text-sm outline-none transition-colors ${
                darkMode
                  ? 'border-white/20 bg-black text-white placeholder:text-white/40 focus:border-white'
                  : 'border-black/20 bg-white text-black placeholder:text-black/40 focus:border-black'
              }`}
              required
            />
            <button
              type="submit"
              className={`px-8 py-3 text-sm tracking-widest uppercase transition-colors whitespace-nowrap ${
                darkMode
                  ? 'bg-white text-black hover:bg-white/80'
                  : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
