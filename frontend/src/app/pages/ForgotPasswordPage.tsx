import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Field } from '../components/common/Field';

export function ForgotPasswordPage() {
  const { darkMode, requestPasswordReset, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setResult(null);
    const res = await requestPasswordReset(email);
    setSending(false);
    setResult(res);
  };

  return (
    <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-[#09090b] text-white' : 'bg-[#f7f5f2] text-black'}`}>
      <div className="relative max-w-md mx-auto px-4 py-12">
        <div className={`rounded-3xl border p-8 sm:p-10 shadow-2xl ${darkMode ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-white'}`}>
          <h1 className="text-2xl tracking-wide uppercase mb-2">Recuperar contraseña</h1>
          <p className={`text-sm mb-8 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>
            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field label="Correo electrónico" name="email" type="email" placeholder="tu@correo.com" value={email} onChange={setEmail} />

            {result && (
              <p className={`text-sm text-center border py-2 px-3 rounded-lg ${
                result.ok
                  ? (darkMode ? 'text-green-200 bg-green-500/10 border-green-400/20' : 'text-green-700 bg-green-50 border-green-200')
                  : (darkMode ? 'text-red-200 bg-red-500/10 border-red-400/20' : 'text-red-500 bg-red-50 border-red-200')
              }`}>
                {result.message}
              </p>
            )}

            <button
              type="submit"
              disabled={sending || !email}
              className={`w-full py-4 text-sm tracking-widest uppercase transition-colors disabled:opacity-50 ${
                darkMode ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              {sending ? 'Enviando...' : 'Enviar enlace'}
            </button>

            <button
              type="button"
              onClick={() => navigate('login')}
              className={`w-full text-sm text-center ${darkMode ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black'}`}
            >
              Volver a iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
