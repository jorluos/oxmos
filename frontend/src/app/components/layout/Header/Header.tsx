import React, { useState } from 'react';
import { ShoppingBag, Heart, User as UserIcon, Menu, X, Search, ChevronDown, Moon, Sun } from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { HeaderSearchBar } from './HeaderSearchBar';
import { HeaderMobileNav } from './HeaderMobileNav';
import { HeaderUserMenu } from './HeaderUserMenu';
import type { Page } from '../../../types';

export function Header() {
  const {
    navigate,
    cartCount,
    wishlist,
    currentUser,
    logout,
    currentPage,
    darkMode,
    toggleDarkMode,
    setCartOpen,
  } = useApp();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('landing');
  };

  const navLinks: Array<{ label: string; page: Page }> = [
    { label: 'Inicio', page: 'landing' },
    { label: 'Tienda', page: 'catalog-gender' },
    { label: 'Políticas', page: 'policies' },
  ];

  const handleSearchSubmit = () => {
    navigate('catalog');
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors ${
        darkMode ? 'bg-black border-white/10' : 'bg-white border-black/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => navigate('landing')}
            className="text-2xl tracking-[0.3em] font-light hover:opacity-80 transition-opacity"
          >
            OXMOS
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.page}
                onClick={() => {
                  navigate(link.page);
                  setUserMenuOpen(false);
                }}
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
              className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'}`}
              aria-label="Cambiar tema"
            >
              {darkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-black" />}
            </button>

            <button
              onClick={() => setSearchOpen(v => !v)}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => navigate('wishlist')}
              className={`p-2 rounded-full transition-colors relative ${darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}
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
              className={`p-2 rounded-full transition-colors relative ${darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'}`}
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
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={`flex items-center gap-1 p-2 rounded-full transition-colors ${
                    darkMode ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-black'
                  }`}
                >
                  <UserIcon size={20} />
                  <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                <HeaderUserMenu
                  currentUser={currentUser}
                  darkMode={darkMode}
                  isOpen={userMenuOpen}
                  onToggle={() => setUserMenuOpen(!userMenuOpen)}
                  onLogout={() => {
                    handleLogout();
                    setUserMenuOpen(false);
                  }}
                />
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

        {searchOpen && (
          <HeaderSearchBar
            searchQuery={searchQuery}
            darkMode={darkMode}
            onSearchChange={setSearchQuery}
            onSearchSubmit={handleSearchSubmit}
            onClose={() => setSearchOpen(false)}
          />
        )}
      </div>

      {menuOpen && (
        <HeaderMobileNav
          navLinks={navLinks}
          isLoggedIn={!!currentUser}
          darkMode={darkMode}
          onNavigate={navigate}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
