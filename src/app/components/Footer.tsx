import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useApp } from './AppContext';

export function Footer() {
  const { navigate, darkMode } = useApp();

  return (
    <footer className={`mt-20 transition-colors ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-2xl tracking-[0.3em] font-light mb-4">OXMOS</h2>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-black/50' : 'text-white/50'}`}>
              Moda contemporánea con identidad propia. Prendas diseñadas para quienes marcan la diferencia.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                darkMode
                  ? 'border-black/20 hover:bg-black hover:text-white'
                  : 'border-white/20 hover:bg-white hover:text-black'
              }`}>
                <Instagram size={16} />
              </a>
              <a href="#" className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                darkMode
                  ? 'border-black/20 hover:bg-black hover:text-white'
                  : 'border-white/20 hover:bg-white hover:text-black'
              }`}>
                <Facebook size={16} />
              </a>
              <a href="#" className={`w-9 h-9 border flex items-center justify-center transition-colors ${
                darkMode
                  ? 'border-black/20 hover:bg-black hover:text-white'
                  : 'border-white/20 hover:bg-white hover:text-black'
              }`}>
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className={`text-xs tracking-widest uppercase mb-4 ${darkMode ? 'text-black/50' : 'text-white/50'}`}>Navegación</h4>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', page: 'landing' as const },
                { label: 'Tienda', page: 'catalog' as const },
                { label: 'Novedades', page: 'catalog' as const },
                { label: 'Ofertas', page: 'catalog' as const },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.page)}
                    className={`text-sm transition-colors ${
                      darkMode ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className={`text-xs tracking-widest uppercase mb-4 ${darkMode ? 'text-black/50' : 'text-white/50'}`}>Mi Cuenta</h4>
            <ul className="space-y-2">
              {[
                { label: 'Iniciar sesión', page: 'login' as const },
                { label: 'Registrarse', page: 'register' as const },
                { label: 'Lista de deseos', page: 'wishlist' as const },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.page)}
                    className={`text-sm transition-colors ${
                      darkMode ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className={`text-xs tracking-widest uppercase mb-4 ${darkMode ? 'text-black/50' : 'text-white/50'}`}>Información</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('policies')}
                  className={`text-sm transition-colors ${
                    darkMode ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Política de cambios y devoluciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('policies')}
                  className={`text-sm transition-colors ${
                    darkMode ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Términos y condiciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('policies')}
                  className={`text-sm transition-colors ${
                    darkMode ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'
                  }`}
                >
                  Preguntas frecuentes
                </button>
              </li>
            </ul>
            <div className={`mt-6 text-sm ${darkMode ? 'text-black/40' : 'text-white/40'}`}>
              <p>Pago contra entrega</p>
              <p className="mt-1">📦 Envío a todo el país</p>
            </div>
          </div>
        </div>

        <div className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
          darkMode ? 'border-black/10' : 'border-white/10'
        }`}>
          <p className={`text-xs ${darkMode ? 'text-black/30' : 'text-white/30'}`}>© 2026 OXMOS. Todos los derechos reservados.</p>
          <button
            onClick={() => navigate('admin-login')}
            className={`text-xs transition-colors ${
              darkMode ? 'text-black/20 hover:text-black/40' : 'text-white/20 hover:text-white/40'
            }`}
          >
            Panel Administrador
          </button>
        </div>
      </div>
    </footer>
  );
}
