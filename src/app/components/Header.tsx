import { useState } from 'react';
import { ShoppingBag, Heart, User, Menu, X, Search, ChevronDown, Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';
import axios from '../../axios';

export function Header() {
  const { navigate, cartCount, wishlist, currentUser, logout, currentPage, darkMode, toggleDarkMode, setCartOpen } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
    } finally {
      logout();
      navigate('landing');
    }
  };

  const navLinks = [
    { label: 'Inicio', page: 'landing' as const },
    { label: 'Tienda', page: 'catalog' as const },
    { label: 'Políticas', page: 'policies' as const },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors ${
      darkMode ? 'bg-black border-white/10' : 'bg-white border-black/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('landing')}
            className={`text-2xl tracking-[0.3em] font-light hover:opacity-70 transition-opacity ${
              darkMode ? 'text-white' : 'text-black'
            }`}
          >OXMOS</button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`text-sm tracking-widest uppercase transition-all ${
                  darkMode
                    ? currentPage === link.page
                      ? 'text-white border-b border-white pb-0.5'
                      : 'text-white/60 hover:text-white'
                    : currentPage === link.page
                    ? 'text-black border-b border-black pb-0.5'
                    : 'text-black/60 hover:text-black'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'
              }`}
              aria-label="Cambiar tema"
            >
              {darkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-black" />}
            </button>

            <button
              onClick={() => setSearchOpen(v => !v)}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'
              }`}
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => navigate('wishlist')}
              className={`p-2 rounded-full transition-colors relative ${
                darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'
              }`}
              aria-label="Favoritos"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setCartOpen(true)}
              className={`p-2 rounded-full transition-colors relative ${
                darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'
              }`}
              aria-label="Carrito"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-white text-black' : 'bg-black text-white'
                }`}>
                  {cartCount}
                </span>
              )}
            </button>

            {currentUser ? (
              <div className="relative group">
                <button className={`flex items-center gap-1 p-2 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'
                }`}>
                  <User size={20} />
                  <ChevronDown size={14} />
                </button>
                <div className={`absolute right-0 top-full mt-1 border shadow-lg w-44 py-1 hidden group-hover:block ${
                  darkMode ? 'bg-black border-white/10' : 'bg-white border-black/10'
                }`}>
                  <div className={`px-3 py-2 border-b ${darkMode ? 'border-white/5' : 'border-black/5'}`}>
                    <p className={`text-xs ${darkMode ? 'text-white/50' : 'text-black/50'}`}>Hola,</p>
                    <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-black'}`}>{currentUser.nombres}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                      darkMode ? 'hover:bg-white/5 text-white' : 'hover:bg-black/5 text-black'
                    }`}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => navigate('login')}
                className={`hidden md:flex items-center gap-1.5 px-4 py-1.5 border text-sm tracking-wide transition-colors ${
                  darkMode
                    ? 'border-white text-white hover:bg-white hover:text-black'
                    : 'border-black text-black hover:bg-black hover:text-white'
                }`}
              >
                Ingresar
              </button>
            )}

            <button
              className={`md:hidden p-2 ${darkMode ? 'text-white' : 'text-black'}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menú"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className={`border-t py-3 flex items-center gap-2 ${
            darkMode ? 'border-white/10' : 'border-black/10'
          }`}>
            <Search size={18} className={darkMode ? 'text-white/40' : 'text-black/40'} />
            <input
              autoFocus
              type="text"
              placeholder="Buscar prendas, marcas..."
              className={`flex-1 outline-none text-sm bg-transparent ${darkMode ? 'text-white placeholder:text-white/40' : 'text-black placeholder:text-black/40'}`}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              e.key === 'Escape' && setSearchOpen(false)
            }
            />
            <button
              onClick={() => setSearchOpen(false)}
              className={darkMode ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={`md:hidden border-t ${
          darkMode ? 'bg-black border-white/10' : 'bg-white border-black/10'
        }`}>
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => { navigate(link.page); setMenuOpen(false); }}
                className={`text-left text-sm tracking-widest uppercase ${
                  darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'
                }`}
              >
                {link.label}
              </button>
            ))}
            {!currentUser && (
              <button
                onClick={() => { navigate('login'); setMenuOpen(false); }}
                className={`text-left text-sm tracking-widest uppercase ${
                  darkMode ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'
                }`}
              >
                Ingresar
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


