import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SECTIONS } from '../../texts/PoliticaPrivText';

export function Policies() {
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {[
            { icon: '🔄', label: '30 días\npara cambios', accent: 'from-white/10 to-white/5' },
            { icon: '🚚', label: 'Envío a todo\nColombia', accent: 'from-white/8 to-white/4' },
            { icon: '💳', label: 'Pago contra\nentrega', accent: 'from-white/6 to-white/3' },
          ].map(card => (
            <div
              key={card.label}
              className={`rounded-2xl border p-4 text-center shadow-sm backdrop-blur-sm ${
                darkMode
                  ? 'border-white/10 bg-gradient-to-b ' + card.accent + ' text-white'
                  : 'border-black/10 bg-white text-black'
              }`}
            >
              <div className="text-2xl mb-2">{card.icon}</div>
              <p className={`text-xs leading-snug whitespace-pre-line ${darkMode ? 'text-white/75' : 'text-black/70'}`}>
                {card.label}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {SECTIONS.map(section => {
            const isOpen = open === section.id;
            return (
              <div
                key={section.id}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  darkMode ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-white'
                }`}
              >
                <button
                  className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${
                    darkMode ? 'hover:bg-white/5' : 'hover:bg-black/3'
                  }`}
                  onClick={() => setOpen(isOpen ? null : section.id)}
                >
                  <span className={`text-sm font-medium tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}>
                    {section.title}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={16} className={darkMode ? 'text-white/70' : 'text-black/70'} />
                  ) : (
                    <ChevronDown size={16} className={darkMode ? 'text-white/70' : 'text-black/70'} />
                  )}
                </button>

                {isOpen && (
                  <div className={`px-5 pb-5 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
                    <div className={`pt-4 text-sm leading-relaxed whitespace-pre-wrap ${darkMode ? 'text-white/70' : 'text-black/65'}`}>
                      {section.content.split('\n').map((line, index) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <p key={index} className={`font-medium mt-3 mb-1 ${darkMode ? 'text-white' : 'text-black'}`}>
                              {line.replace(/\*\*/g, '')}
                            </p>
                          );
                        }

                        if (line.startsWith('•')) {
                          return (
                            <p key={index} className="flex gap-2 mt-1">
                              <span>•</span>
                              <span>{line.slice(1).trim()}</span>
                            </p>
                          );
                        }

                        if (line.match(/^\d\./)) {
                          return <p key={index} className="mt-1 ml-4">{line}</p>;
                        }

                        if (line === '') {
                          return <div key={index} className="h-2" />;
                        }

                        return <p key={index}>{line}</p>;
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className={`mt-10 rounded-2xl border p-6 text-center shadow-lg ${
            darkMode
              ? 'border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02]'
              : 'border-black/10 bg-white'
          }`}
        >
          <p className={`text-xs tracking-widest uppercase mb-2 ${darkMode ? 'text-white/45' : 'text-black/45'}`}>
            ¿Tienes preguntas?
          </p>
          <p className={`text-sm mb-5 ${darkMode ? 'text-white/70' : 'text-black/60'}`}>
            Nuestro equipo está disponible para ayudarte de lunes a sábado.
          </p>
          <a
            href="https://wa.me/573166932158"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-colors ${
              darkMode
                ? 'bg-white text-black hover:bg-white/90'
                : 'bg-black text-white hover:bg-black/90'
            }`}
          >
            💬 Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
