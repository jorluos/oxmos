import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Gender } from '../types';

const COLLECTIONS: Array<{
  gender: Extract<Gender, 'Hombre' | 'Mujer'>;
  title: string;
  subtitle: string;
  image: string;
}> = [
  {
    gender: 'Hombre',
    title: 'Hombre',
    subtitle: 'Sastrería, abrigos y esenciales contemporáneos.',
    image: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=1100&q=80',
  },
  {
    gender: 'Mujer',
    title: 'Mujer',
    subtitle: 'Vestidos, conjuntos y siluetas editoriales.',
    image: 'https://images.unsplash.com/photo-1771591485611-45264af86618?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=900&h=1100&q=80',
  },
];

export function CatalogGenderSelection() {
  const { darkMode, selectCatalogGender } = useApp();

  return (
    <div className={`min-h-screen pt-16 transition-colors ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="mb-10">
          <span className={`text-xs tracking-[0.4em] uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
            Tienda
          </span>
          <h1 className={`mt-2 text-4xl sm:text-5xl font-light ${darkMode ? 'text-white' : 'text-black'}`}>
            Elige tu colección
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
          {COLLECTIONS.map(collection => (
            <button
              key={collection.gender}
              onClick={() => selectCatalogGender(collection.gender)}
              className="group relative min-h-[430px] overflow-hidden text-left"
            >
              <img
                src={collection.image}
                alt={`Colección ${collection.title}`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="relative z-10 flex h-full min-h-[430px] flex-col justify-end p-6 sm:p-8">
                <span className="mb-3 text-xs uppercase tracking-[0.35em] text-white/60">Colección</span>
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-4xl sm:text-5xl font-light text-white">{collection.title}</h2>
                    <p className="mt-3 max-w-sm text-sm text-white/70">{collection.subtitle}</p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/70 text-white transition-colors group-hover:bg-white group-hover:text-black">
                    <ArrowRight size={18} />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
