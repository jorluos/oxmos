import { useState, useEffect } from 'react';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data';
import { getProductPrimaryImage, getProductDiscount, getProductCategoryLabel, getMinVariantPrice } from './productHelpers';

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

  // Productos destacados: is_featured = true
  const featured = products.filter(p => p.is_featured).slice(0, 4);
  // Productos nuevos: etiquetados como 'nuevo' en colecciones
  const newItems = products.filter(p => {
    const label = getProductCategoryLabel(p);
    return label === 'Nuevo';
  }).slice(0, 3);

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
      </section>

      {/* Featured section */}
      <section className={`py-20 px-4 sm:px-8 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className={`text-xs tracking-[0.3em] uppercase mb-2 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Destacados</p>
              <h2 className={`text-2xl sm:text-3xl ${darkMode ? 'text-white' : 'text-black'}`}>Productos Destacados</h2>
            </div>
            <button
              onClick={() => navigate('catalog')}
              className={`text-xs tracking-wider border-b pb-0.5 transition-colors hidden sm:block ${
                darkMode ? 'text-white/40 border-white/20 hover:text-white hover:border-white' : 'text-black/40 border-black/20 hover:text-black hover:border-black'
              }`}
            >
              Ver todo
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {featured.map(product => {
              const imgUrl = getProductPrimaryImage(product);
              const discount = getProductDiscount(product);
              const categoryLabel = getProductCategoryLabel(product);
              return (
                <div
                  key={product.id}
                  onClick={() => navigate('product', String(product.id))}
                  className="group cursor-pointer"
                >
                  <div className={`relative aspect-[3/4] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    {imgUrl ? (
                      <img src={imgUrl} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-black/20">Sin imagen</div>
                    )}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {categoryLabel && (
                        <span className={`text-[9px] tracking-widest px-2 py-1 uppercase ${
                          darkMode ? 'bg-white text-black' : 'bg-black text-white'
                        }`}>{categoryLabel}</span>
                      )}
                      {discount && <span className={`text-[9px] tracking-widest px-2 py-1 ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>-{discount}%</span>}
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className={`text-[11px] tracking-wide uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{product.gender} · {product.type ?? 'General'}</p>
                    <p className={`text-sm mt-0.5 ${darkMode ? 'text-white' : 'text-black'}`}>{product.name}</p>
                    <span className={`text-sm font-medium mt-1 block ${darkMode ? 'text-white' : 'text-black'}`}>
                      {formatPrice(getMinVariantPrice(product))}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories / Collections */}
      <section className={`py-20 px-4 sm:px-8 ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className={`text-xs tracking-[0.3em] uppercase mb-2 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Colecciones</p>
            <h2 className={`text-2xl sm:text-3xl ${darkMode ? 'text-white' : 'text-black'}`}>Nuestras Colecciones</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Nuevos Ingresos', filter: 'NUEVO', img: 'https://images.unsplash.com/photo-1771591485611-45264af86618?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=600&h=800&q=80' },
              { label: 'Tendencias', filter: 'TENDENCIA', img: 'https://images.unsplash.com/photo-1769103638527-3240c2f5d4ad?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=600&h=800&q=80' },
              { label: 'Ofertas Especiales', filter: 'OFERTA', img: 'https://images.unsplash.com/photo-1769458711036-17514a5838cb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=600&h=800&q=80' },
            ].map(col => (
              <button
                key={col.label}
                onClick={() => navigate('catalog')}
                className="group relative h-72 sm:h-96 overflow-hidden"
              >
                <img src={col.img} alt={col.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <div className="text-left">
                    <p className="text-white text-lg font-medium">{col.label}</p>
                    <p className="text-white/50 text-xs tracking-widest uppercase mt-1">Ver colección →</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      {newItems.length > 0 && (
        <section className={`py-20 px-4 sm:px-8 ${darkMode ? 'bg-black' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className={`text-xs tracking-[0.3em] uppercase mb-2 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Nuevos</p>
                <h2 className={`text-2xl sm:text-3xl ${darkMode ? 'text-white' : 'text-black'}`}>Nuevos Ingresos</h2>
              </div>
              <button
                onClick={() => navigate('catalog')}
                className={`text-xs tracking-wider border-b pb-0.5 transition-colors hidden sm:block ${
                  darkMode ? 'text-white/40 border-white/20 hover:text-white hover:border-white' : 'text-black/40 border-black/20 hover:text-black hover:border-black'
                }`}
              >
                Ver todo
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {newItems.map(product => {
                const imgUrl = getProductPrimaryImage(product);
                return (
                  <div
                    key={product.id}
                    onClick={() => navigate('product', String(product.id))}
                    className="group cursor-pointer"
                  >
                    <div className={`relative aspect-[3/4] overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                      {imgUrl ? (
                        <img src={imgUrl} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-black/20">Sin imagen</div>
                      )}
                    </div>
                    <div className="mt-2">
                      <p className={`text-xs mt-0.5 truncate ${darkMode ? 'text-white' : 'text-black'}`}>{product.name}</p>
                      <span className={`text-xs font-medium ${darkMode ? 'text-white/70' : 'text-black/60'}`}>
                        {formatPrice(getMinVariantPrice(product))}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className={`py-20 px-4 sm:px-8 ${darkMode ? 'bg-white/5' : 'bg-black/5'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FEATURES.map(f => (
              <div key={f.title} className="text-center">
                <span className="text-4xl block mb-3">{f.icon}</span>
                <p className={`text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>{f.title}</p>
                <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 px-4 sm:px-8 ${darkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-3xl mx-auto text-center">
          <Quote size={32} className={`mx-auto mb-6 ${darkMode ? 'text-white/20' : 'text-black/20'}`} />
          <p className={`text-lg sm:text-xl leading-relaxed mb-6 ${darkMode ? 'text-white/80' : 'text-black/70'}`}>
            "{TESTIMONIALS[testimonialIdx].text}"
          </p>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} size={14} className={darkMode ? 'fill-white text-white' : 'fill-black text-black'} />
            ))}
          </div>
          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>{TESTIMONIALS[testimonialIdx].name}</p>
          <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>{TESTIMONIALS[testimonialIdx].city}</p>
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => setTestimonialIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                darkMode ? 'border-white/20 hover:border-white text-white' : 'border-black/20 hover:border-black text-black'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length)}
              className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                darkMode ? 'border-white/20 hover:border-white text-white' : 'border-black/20 hover:border-black text-black'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
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
    </div>
  );
}