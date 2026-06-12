import { useApp } from '../context/AppContext';

export function BigBanner() {
    const { navigate, darkMode } = useApp();
    return (
        <div className={`relative h-96 sm:h-[500px] overflow-hidden ${darkMode ? 'bg-white' : 'bg-black'}`}>
          <img
            src="https://images.unsplash.com/photo-1666932521131-d990bd263a2c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=1400&h=600&q=80"
            alt="Editorial"
            className="w-full h-full object-cover opacity-70"
          />
          <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 ${
            darkMode ? 'text-black' : 'text-white'
          }`}>
            <span className={`text-xs tracking-[0.5em] uppercase mb-3 ${darkMode ? 'text-black/60' : 'text-white/60'}`}>Tendencia de la temporada</span>
            <h2 className={`text-4xl sm:text-6xl mb-6 ${darkMode ? 'text-black' : 'text-white'}`}>Elegancia Oscura</h2>
            <button
              onClick={() => navigate('catalog')}
              className={`px-10 py-3 text-sm tracking-widest uppercase border transition-colors ${
                darkMode
                  ? 'bg-black text-white hover:bg-white hover:text-black border-black'
                  : 'bg-white text-black hover:bg-black hover:text-white border-white'
              }`}
            >
              Descubrir
            </button>
          </div>
        </div>
    )
}