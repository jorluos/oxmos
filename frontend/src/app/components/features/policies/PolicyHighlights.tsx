import React from 'react';

interface PolicyHighlightsProps {
  darkMode: boolean;
}

const HIGHLIGHTS = [
  { icon: '🔄', label: '30 días\npara cambios', accent: 'from-white/10 to-white/5' },
  { icon: '🚚', label: 'Envío a todo\nColombia', accent: 'from-white/8 to-white/4' },
  { icon: '💳', label: 'Pago contra\nentrega', accent: 'from-white/6 to-white/3' },
];

export function PolicyHighlights({ darkMode }: PolicyHighlightsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
      {HIGHLIGHTS.map(card => (
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
  );
}
