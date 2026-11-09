import React from 'react';

interface PolicySupportCardProps {
  darkMode: boolean;
}

export function PolicySupportCard({ darkMode }: PolicySupportCardProps) {
  return (
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
  );
}
