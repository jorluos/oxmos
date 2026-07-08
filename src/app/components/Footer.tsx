import { Instagram, Facebook } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Footer() {
  const { navigate } = useApp();

  return (
    <footer className="bg-black text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h2 className="text-2xl tracking-[0.3em] font-light mb-4">OXMOS</h2>
            <p className="text-sm leading-relaxed text-white/50">
              Prendas de calidad.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/oxmos_xs/"
                className="w-9 h-9 border border-white/20 flex items-center justify-center transition-colors hover:bg-white hover:text-black"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 border border-white/20 flex items-center justify-center transition-colors hover:bg-white hover:text-black"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 text-white/50">Navegación</h4>
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
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 text-white/50">Mi Cuenta</h4>
            <ul className="space-y-2">
              {[
                { label: 'Iniciar sesión', page: 'login' as const },
                { label: 'Registrarse', page: 'register' as const },
                { label: 'Lista de deseos', page: 'wishlist' as const },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => navigate(item.page)}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase mb-4 text-white/50">Información</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('policies')}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Política de cambios y devoluciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('policies')}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Términos y condiciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('policies')}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  Preguntas frecuentes
                </button>
              </li>
            </ul>
            <div className="mt-6 text-sm text-white/40">
              <p>Pago contra entrega</p>
              <p className="mt-1">📦 Envío a todo el país</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">© 2026 OXMOS. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
