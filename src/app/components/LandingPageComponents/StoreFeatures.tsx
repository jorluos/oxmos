import { useApp } from "../../context/AppContext";


const FEATURES = [
  { icon: '🚚', title: 'Envío Nacional', desc: 'Llegamos a toda Colombia.' },
  { icon: '💳', title: 'Pago con Wompi', desc: 'Tarjetas, PSE, Nequi y Bancolombia' },
  { icon: '↩️', title: 'Cambios', desc: 'Hasta 15 días para cambiar de talla o estilo.' },
  { icon: '✅', title: 'Calidad Garantizada', desc: 'Materiales premium seleccionados con cuidado.' },
];

export function StoreFeatures() {
  return (
    <section className="bg-black py-6 px-4 sm:px-8 border-y border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="flex items-center gap-3.5 text-left">
              <span className="text-2xl sm:text-3xl shrink-0">{f.icon}</span>
              <div>
                <p className="text-sm font-semibold text-white tracking-wide">{f.title}</p>
                <p className="text-[11px] text-white/50 mt-0.5 leading-tight">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}