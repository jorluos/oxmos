import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PasswordField } from '../components/common/PasswordField';

function useQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return { token: params.get('token') ?? '', email: params.get('email') ?? '' };
}

export function ResetPasswordPage() {
  const { darkMode, resetPassword, navigate } = useApp();
  const { token, email } = useQueryParams();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const missingLink = !token || !email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setResult({ ok: false, message: 'Las contraseñas no coinciden.' });
      return;
    }
    setSaving(true);
    setResult(null);
    const res = await resetPassword({ token, email, password, password_confirmation: confirmPassword });
    setSaving(false);
    setResult(res);
    if (res.ok) {
      setTimeout(() => navigate('login'), 1500);
    }
  };

  return (
    <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-[#09090b] text-white' : 'bg-[#f7f5f2] text-black'}`}>
      <div className="relative max-w-md mx-auto px-4 py-12">
        <div className={`rounded-3xl border p-8 sm:p-10 shadow-2xl ${darkMode ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-white'}`}>
          <h1 className="text-2xl tracking-wide uppercase mb-2">Nueva contraseña</h1>

          {missingLink ? (
            <p className={`text-sm ${darkMode ? 'text-red-200' : 'text-red-500'}`}>
              Este enlace no es válido. Solicita uno nuevo desde "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className={`text-sm mb-2 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>Para: {email}</p>

              <PasswordField
                label="Nueva contraseña"
                value={password}
                onChange={setPassword}
                placeholder="Mínimo 8 caracteres"
                showToggle
                showPw={showPw}
                onToggleShowPw={() => setShowPw(s => !s)}
              />
              <PasswordField
                label="Confirmar contraseña"
                value={confirmPassword}
                onChange={setConfirmPassword}
                placeholder="Repite tu contraseña"
              />

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
                disabled={saving}
                className={`w-full py-4 text-sm tracking-widest uppercase transition-colors disabled:opacity-50 ${
                  darkMode ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'
                }`}
              >
                {saving ? 'Guardando...' : 'Cambiar contraseña'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
