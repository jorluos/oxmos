import { useApp } from '../context/AppContext';
import { GenderCollectionCard } from '../components/features/catalog/GenderCollectionCard';
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

export function CatalogGenderPage() {
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
            <GenderCollectionCard
              key={collection.gender}
              gender={collection.gender}
              title={collection.title}
              subtitle={collection.subtitle}
              image={collection.image}
              onSelect={(g) => selectCatalogGender(g)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export { CatalogGenderPage as CatalogGenderSelection };
