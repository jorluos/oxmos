import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SECTIONS } from '../../texts/PoliticaPrivText';
import { PolicyHighlights } from '../components/features/policies/PolicyHighlights';
import { PolicyAccordion } from '../components/features/policies/PolicyAccordion';
import { PolicySupportCard } from '../components/features/policies/PolicySupportCard';

export function PoliciesPage() {
  const { darkMode } = useApp();
  const [open, setOpen] = useState<string | null>('cambios');

  return (
    <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-[#09090b] text-white' : 'bg-[#f8f8f6] text-black'}`}>
      <div className={`absolute inset-0 pointer-events-none ${darkMode ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-0 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-0 top-32 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <span className={`text-xs tracking-[0.4em] uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
            Legal & Servicio
          </span>
          <h1 className={`mt-3 text-3xl sm:text-4xl tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>
            Políticas y Condiciones
          </h1>
          <p className={`text-sm mt-4 max-w-lg mx-auto leading-relaxed ${darkMode ? 'text-white/65' : 'text-black/55'}`}>
            Conoce nuestras políticas de cambios, devoluciones, envíos y más. Tu satisfacción es nuestra prioridad.
          </p>
        </div>

        <PolicyHighlights darkMode={darkMode} />

        <div className="space-y-3">
          {SECTIONS.map(section => (
            <PolicyAccordion
              key={section.id}
              section={section}
              isOpen={open === section.id}
              darkMode={darkMode}
              onToggle={() => setOpen(open === section.id ? null : section.id)}
            />
          ))}
        </div>

        <PolicySupportCard darkMode={darkMode} />
      </div>
    </div>
  );
}

export { PoliciesPage as Policies };
