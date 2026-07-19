import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Login() {
  const { login, navigate, darkMode } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        navigate('catalog');
      } else {
        setError('Correo o contraseña incorrectos.');
      }
    } catch {
      setError('Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-[#09090b] text-white' : 'bg-[#f7f5f2] text-black'}`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-20 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full blur-3xl ${darkMode ? 'bg-white/5' : 'bg-black/5'}`} />
      </div>

      <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
        <div className={`w-full max-w-md rounded-3xl border p-8 sm:p-10 shadow-2xl backdrop-blur-sm ${
          darkMode ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-white'
        }`}>
          <div className="text-center mb-8">
            <h1 className={`text-3xl tracking-[0.3em] font-light mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>OXMOS</h1>
            <p className={`text-sm ${darkMode ? 'text-white/55' : 'text-black/40'}`}>Inicia sesión en tu cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/55' : 'text-black/50'}`}>Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="tu@correo.com"
                required
                className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${
                  darkMode
                    ? 'border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus:border-white/30'
                    : 'border-black/15 bg-white text-black placeholder:text-black/35 focus:border-black'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/55' : 'text-black/50'}`}>Contraseña</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="••••••••"
                  required
                  className={`w-full border px-4 py-3 text-sm outline-none pr-12 transition-colors ${
                    darkMode
                      ? 'border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus:border-white/30'
                      : 'border-black/15 bg-white text-black placeholder:text-black/35 focus:border-black'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${darkMode ? 'text-white/35 hover:text-white/70' : 'text-black/30 hover:text-black/60'}`}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className={`text-sm text-center border py-2 px-3 rounded-lg ${darkMode ? 'text-red-200 bg-red-500/10 border-red-400/20' : 'text-red-500 bg-red-50 border-red-200'}`}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 text-sm tracking-widest uppercase transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                darkMode ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
            </button>

            <div className={`text-center text-xs py-2 ${darkMode ? 'text-white/55' : 'text-black/40'}`}>
              ¿No tienes una cuenta?{' '}
              <button
                type="button"
                onClick={() => navigate('register')}
                className={`underline underline-offset-2 transition-colors ${darkMode ? 'text-white hover:text-white/70' : 'text-black hover:text-black/60'}`}
              >
                Regístrate aquí
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
