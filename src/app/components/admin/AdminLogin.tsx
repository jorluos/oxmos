import { useState } from 'react';
import type { FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function AdminLogin() {
  const { adminLogin, navigate } = useApp();
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      navigate('admin');
    } else {
      setError('Contraseña incorrecta.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl tracking-[0.3em] font-light mb-1">OXMOS</h1>
          <p className="text-xs tracking-widest uppercase text-black/40">Panel de Administrador</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Contraseña</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={(e: any) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                required
                className="w-full border border-black/20 focus:border-black px-4 py-3 text-sm outline-none pr-12"
              />
              <button type="button" onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          <button type="submit"
            className="w-full bg-black text-white py-3 text-sm tracking-widest uppercase hover:bg-black/80 transition-colors">
            Ingresar
          </button>
          <p className="text-[11px] text-center text-black/30">Contraseña de demo: admin123</p>
        </form>
        <button onClick={() => navigate('landing')} className="w-full mt-4 text-xs text-black/30 hover:text-black text-center">
          ← Volver a la tienda
        </button>
      </div>
    </div>
  );
}
