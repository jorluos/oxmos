import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import axios from '../../axios';
import type { User } from '../types';

export function Login() {
  const { login, navigate } = useApp();
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
    <div className="pt-16 min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl tracking-[0.3em] font-light mb-2">OXMOS</h1>
          <p className="text-black/40 text-sm">Inicia sesión en tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="tu@correo.com"
              required
              className="w-full border border-black/20 focus:border-black px-4 py-3 text-sm outline-none"
            />
          </div>
          
          <div>
            <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Contraseña</label>
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
                className="w-full border border-black/20 focus:border-black px-4 py-3 text-sm outline-none pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 py-2 px-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-4 text-sm tracking-widest uppercase hover:bg-black/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>

          <div className="text-center text-xs text-black/40 py-2">
            ¿No tienes una cuenta?{' '}
            <button
              type="button"
              onClick={() => navigate('register')}
              className="text-black underline underline-offset-2 hover:text-black/60"
            >
              Regístrate aquí
            </button>
          </div>
        </form>

        <div className="mt-8 p-4 bg-black/3 border border-black/10 text-center">
          <p className="text-xs text-black/40">
            Cuenta de prueba: <strong>maria@ejemplo.com</strong> · contraseña: <strong>123456</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
