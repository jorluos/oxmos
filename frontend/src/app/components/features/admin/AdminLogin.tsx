import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export function AdminLogin() {
  const { adminLogin, navigate, darkMode } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const ok = await adminLogin(email, password);
    setLoading(false);

    if (ok) {
      navigate('admin');
    } else {
      setError('Credenciales incorrectas o el usuario no tiene permisos de administrador.');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className={`max-w-sm w-full border p-8 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
        <div className="text-center mb-8">
          <div className={`w-12 h-12 border flex items-center justify-center mx-auto mb-4 ${
            darkMode ? 'border-white/20' : 'border-black/20'
          }`}>
            <Lock size={20} />
          </div>
          <span className={`text-xs tracking-[0.4em] uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Panel de Control</span>
          <h1 className="text-xl font-light mt-1">Acceso Administrador</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
              Correo electrónico
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="admin@oxmos.com"
                required
                className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${
                  darkMode
                    ? 'border-white/20 focus:border-white bg-transparent text-white'
                    : 'border-black/20 focus:border-black text-black'
                }`}
              />
              <Mail size={16} className={`absolute right-3.5 top-1/2 -translate-y-1/2 ${darkMode ? 'text-white/30' : 'text-black/30'}`} />
            </div>
          </div>

          <div>
            <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${
                darkMode
                  ? 'border-white/20 focus:border-white bg-transparent text-white'
                  : 'border-black/20 focus:border-black text-black'
              }`}
            />
            <p className={`text-[11px] mt-1 ${darkMode ? 'text-white/30' : 'text-black/30'}`}>
              Email: <code>admin@oxmos.com</code> · Clave: <code>administradorcito321</code>
            </p>
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 text-xs tracking-widest uppercase transition-colors disabled:opacity-50 ${
              darkMode ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-black/80'
            }`}
          >
            {loading ? 'Verificando...' : 'Ingresar al panel'}
          </button>
        </form>

        <button
          onClick={() => navigate('landing')}
          className={`w-full text-center text-xs mt-6 transition-colors ${
            darkMode ? 'text-white/30 hover:text-white' : 'text-black/30 hover:text-black'
          }`}
        >
          ← Volver a la tienda
        </button>
      </div>
    </div>
  );
}
