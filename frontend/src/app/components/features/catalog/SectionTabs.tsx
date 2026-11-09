interface SectionTabsProps {
  section: string;
  onSectionChange: (section: string) => void;
  darkMode: boolean;
}

const SECTIONS = [
  { id: 'todo', label: 'Todo' },
  { id: 'novedades', label: 'Novedades' },
  { id: 'destacados', label: 'Destacados' },
  { id: 'ofertas', label: 'Ofertas' },
];

export function SectionTabs({ section, onSectionChange, darkMode }: SectionTabsProps) {
  return (
    <div className={`border-b ${darkMode ? 'border-white/10 bg-black' : 'border-black/10 bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-8 overflow-x-auto py-4">
          {SECTIONS.map(s => (
            <button
              key={s.id}
              onClick={() => onSectionChange(s.id)}
              className={`text-xs tracking-widest uppercase transition-colors whitespace-nowrap pb-1 border-b-2 ${
                section === s.id
                  ? darkMode
                    ? 'border-white text-white font-medium'
                    : 'border-black text-black font-medium'
                  : darkMode
                  ? 'border-transparent text-white/40 hover:text-white'
                  : 'border-transparent text-black/40 hover:text-black'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
