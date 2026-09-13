import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Field } from '../components/common/Field';

export function ProfilePage() {
  const { darkMode, currentUser, updateProfile, navigate } = useApp();

  const defaultAddress = currentUser?.addresses?.find(a => a.is_default_shipping) ?? currentUser?.addresses?.[0];

  const [form, setForm] = useState({
    first_name: currentUser?.first_name ?? '',
    last_name: currentUser?.last_name ?? '',
    phone: currentUser?.phone ?? '',
    address: defaultAddress?.street_line_1 ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);

  if (!currentUser) {
    return (
      <div className={`pt-24 min-h-screen text-center transition-colors ${darkMode ? 'bg-[#09090b] text-white' : 'bg-[#f7f5f2] text-black'}`}>
        <p className="mb-4">Debes iniciar sesión para ver tu perfil.</p>
        <button
          onClick={() => navigate('login')}
          className={`px-6 py-3 text-sm tracking-widest uppercase ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  const update = (key: keyof typeof form, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    const result = await updateProfile(form);
    setSaving(false);
    setMessage(result.ok
      ? { type: 'ok', text: 'Tus datos se actualizaron correctamente.' }
      : { type: 'error', text: result.message ?? 'No se pudo actualizar el perfil.' });
  };

  return (
    <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-[#09090b] text-white' : 'bg-[#f7f5f2] text-black'}`}>
      <div className="relative max-w-lg mx-auto px-4 py-12">
        <div className={`rounded-3xl border p-8 sm:p-10 shadow-2xl ${darkMode ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-white'}`}>
          <h1 className="text-2xl tracking-wide uppercase mb-1">Mi perfil</h1>
          <p className={`text-sm mb-8 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>{currentUser.email}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nombre" name="first_name" value={form.first_name} onChange={(v) => update('first_name', v)} />
              <Field label="Apellido" name="last_name" value={form.last_name} onChange={(v) => update('last_name', v)} />
            </div>
            <Field label="Número de teléfono" name="phone" type="tel" placeholder="3001234567" value={form.phone} onChange={(v) => update('phone', v)} />
            <Field label="Dirección" name="address" placeholder="Calle, carrera, número, ciudad" value={form.address} onChange={(v) => update('address', v)} />

            {message && (
              <p className={`text-sm text-center border py-2 px-3 rounded-lg ${
                message.type === 'ok'
                  ? (darkMode ? 'text-green-200 bg-green-500/10 border-green-400/20' : 'text-green-700 bg-green-50 border-green-200')
                  : (darkMode ? 'text-red-200 bg-red-500/10 border-red-400/20' : 'text-red-500 bg-red-50 border-red-200')
              }`}>
                {message.text}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className={`w-full py-4 text-sm tracking-widest uppercase transition-colors disabled:opacity-50 ${
                darkMode ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
