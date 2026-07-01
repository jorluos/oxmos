import { useApp } from '../../context/AppContext';

export function NewsLetter() {
    const { darkMode } = useApp();
    return (
        <div className="max-w-xl mx-auto text-center">
          <span className={`text-xs tracking-[0.4em] uppercase mb-3 block ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Newsletter</span>
          <h2 className={`mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>Sé el Primero en Saber</h2>
          <p className={`text-sm mb-8 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
            Recibe novedades, descuentos exclusivos y tendencias directamente en tu correo.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              alert('¡Gracias por suscribirte!');
            }}
          >
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className={`flex-1 border px-4 py-3 text-sm outline-none transition-colors ${
                darkMode
                  ? 'border-white/20 bg-black text-white placeholder:text-white/40 focus:border-white'
                  : 'border-black/20 bg-white text-black placeholder:text-black/40 focus:border-black'
              }`}
              required
            />
            <button
              type="submit"
              className={`px-8 py-3 text-sm tracking-widest uppercase transition-colors whitespace-nowrap ${
                darkMode
                  ? 'bg-white text-black hover:bg-white/80'
                  : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              Suscribirme
            </button>
          </form>
        </div>
    )
}