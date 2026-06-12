import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { SECTIONS } from '../../texts/PoliticaPrivText';

export function Policies() {
  const [open, setOpen] = useState<string | null>('cambios');

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.4em] uppercase text-black/40">Legal & Servicio</span>
          <h1 className="mt-2">Políticas y Condiciones</h1>
          <p className="text-black/50 text-sm mt-3 max-w-lg mx-auto">
            Conoce nuestras políticas de cambios, devoluciones, envíos y más. Tu satisfacción es nuestra prioridad.
          </p>
        </div>

        {/* Quick cards */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: '🔄', label: '30 días\npara cambios', color: 'bg-black' },
            { icon: '🚚', label: 'Envío a todo\nColombia', color: 'bg-black/80' },
            { icon: '💳', label: 'Pago contra\nentrega', color: 'bg-black/60' },
          ].map(card => (
            <div key={card.label} className={`${card.color} text-white p-4 text-center`}>
              <div className="text-2xl mb-2">{card.icon}</div>
              <p className="text-xs leading-snug whitespace-pre-line">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {SECTIONS.map(section => (
            <div key={section.id} className="border border-black/10">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-black/2 transition-colors"
                onClick={() => setOpen(open === section.id ? null : section.id)}
              >
                <span className="text-sm font-medium tracking-wide">{section.title}</span>
                {open === section.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {open === section.id && (
                <div className="px-5 pb-5 border-t border-black/10">
                  <div className="pt-4 text-sm text-black/60 leading-relaxed whitespace-pre-wrap">
                    {section.content.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={i} className="font-medium text-black mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
                      }
                      if (line.startsWith('•')) {
                        return <p key={i} className="flex gap-2 mt-1"><span>•</span><span>{line.slice(1).trim()}</span></p>;
                      }
                      if (line.match(/^\d\./)) {
                        return <p key={i} className="mt-1 ml-4">{line}</p>;
                      }
                      if (line === '') return <div key={i} className="h-2" />;
                      return <p key={i}>{line}</p>;
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 bg-black text-white p-6 text-center">
          <p className="text-xs tracking-widest uppercase text-white/60 mb-2">¿Tienes preguntas?</p>
          <p className="text-white/80 text-sm mb-4">
            Nuestro equipo está disponible para ayudarte de lunes a sábado.
          </p>
          <a
            href="https://wa.me/573166932158"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm hover:bg-white hover:text-black transition-colors"
          >
            💬 Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
