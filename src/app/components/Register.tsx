import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import axios from '../../axios';
import { Field } from './Field';

export function Register() {
  const { setCurrentUser, navigate, darkMode } = useApp();
  const [form, setForm] = useState({
    nombres: '', apellidos: '', cedula: '', telefono: '',
    correo: '', cumpleanos: '', direccion: '', password: '', confirmPassword: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');

  const update = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    setGlobalError('');
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nombres.trim()) e.nombres = 'Requerido';
    if (!form.apellidos.trim()) e.apellidos = 'Requerido';
    if (!form.cedula.trim() || form.cedula.length < 6) e.cedula = 'Ingresa un número válido';
    if (!form.telefono.trim() || form.telefono.length < 7) e.telefono = 'Ingresa un número válido';
    if (!form.correo.trim() || !form.correo.includes('@')) e.correo = 'Correo inválido';
    if (!form.cumpleanos) e.cumpleanos = 'Requerido';
    if (!form.direccion.trim()) e.direccion = 'Requerido';
    if (!form.password || form.password.length < 8) e.password = 'Mínimo 8 caracteres';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

      await axios.post(
        '/register',
        {
          first_name: form.nombres,
          last_name: form.apellidos,
          document_number: form.cedula,
          phone: form.telefono,
          email: form.correo,
          birth_date: form.cumpleanos,
          password: form.password,
          password_confirmation: form.confirmPassword,
        },
        { withCredentials: true }
      );

      const { data } = await axios.get('/api/user', { withCredentials: true });
      setCurrentUser(data.data);
      navigate('catalog');
    } catch (error: any) {
      if (error?.response?.status === 422) {
        setGlobalError('No se pudo registrar. Verifica los datos o usa otro correo.');
      } else {
        setGlobalError('No se pudo crear la cuenta. Inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-[#09090b] text-white' : 'bg-[#f7f5f2] text-black'}`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-20 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full blur-3xl ${darkMode ? 'bg-white/5' : 'bg-black/5'}`} />
      </div>

      <div className="relative max-w-lg mx-auto px-4 py-12">
        <div className={`rounded-3xl border p-8 sm:p-10 shadow-2xl backdrop-blur-sm ${
          darkMode ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-white'
        }`}>
          <div className="text-center mb-8">
            <h1 className={`text-3xl tracking-[0.3em] font-light mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>OXMOS</h1>
            <p className={`text-sm ${darkMode ? 'text-white/55' : 'text-black/40'}`}>Crea tu cuenta gratuita</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nombres" name="nombres" placeholder="María" value={form.nombres} error={errors.nombres} onChange={(value) => update('nombres', value)} />
              <Field label="Apellidos" name="apellidos" placeholder="García López" value={form.apellidos} error={errors.apellidos} onChange={(value) => update('apellidos', value)} />
              <Field label="Número de cédula" name="cedula" placeholder="1234567890" value={form.cedula} error={errors.cedula} onChange={(value) => update('cedula', value)} />
              <Field label="Teléfono / WhatsApp" name="telefono" type="tel" placeholder="3001234567" value={form.telefono} error={errors.telefono} onChange={(value) => update('telefono', value)} />
            </div>

            <Field label="Correo electrónico" name="correo" type="email" placeholder="tu@correo.com" value={form.correo} error={errors.correo} onChange={(value) => update('correo', value)} />
            <Field label="Fecha de cumpleaños" name="cumpleanos" type="date" value={form.cumpleanos} error={errors.cumpleanos} onChange={(value) => update('cumpleanos', value)} />
            <Field label="Dirección de residencia" name="direccion" placeholder="Calle, carrera, número, ciudad" value={form.direccion} error={errors.direccion} onChange={(value) => update('direccion', value)} />

            <div>
              <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/55' : 'text-black/50'}`}>Contraseña *</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('password', e.target.value)}
                  placeholder="Mínimo 8 caracteres"
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
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/55' : 'text-black/50'}`}>Confirmar contraseña *</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => update('confirmPassword', e.target.value)}
                placeholder="Repite tu contraseña"
                className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${
                  darkMode
                    ? 'border-white/10 bg-white/[0.03] text-white placeholder:text-white/30 focus:border-white/30'
                    : 'border-black/15 bg-white text-black placeholder:text-black/35 focus:border-black'
                }`}
              />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
            </div>

            {globalError && (
              <p className={`text-sm text-center border py-2 px-3 rounded-lg ${darkMode ? 'text-red-200 bg-red-500/10 border-red-400/20' : 'text-red-500 bg-red-50 border-red-200'}`}>
                {globalError}
              </p>
            )}

            <p className={`text-xs leading-relaxed ${darkMode ? 'text-white/55' : 'text-black/40'}`}>
              Al registrarte, aceptas nuestros{' '}
              <button type="button" onClick={() => navigate('policies')} className={`underline underline-offset-2 ${darkMode ? 'text-white hover:text-white/70' : 'text-black hover:text-black/60'}`}>
                términos y condiciones
              </button>{' '}
              y nuestra{' '}
              <button type="button" onClick={() => navigate('policies')} className={`underline underline-offset-2 ${darkMode ? 'text-white hover:text-white/70' : 'text-black hover:text-black/60'}`}>
                política de privacidad
              </button>.
            </p>

            <button
              type="submit"
              className={`w-full py-4 text-sm tracking-widest uppercase transition-colors ${
                darkMode ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              Crear cuenta
            </button>

            <div className={`text-center text-xs ${darkMode ? 'text-white/55' : 'text-black/40'}`}>
              ¿Ya tienes una cuenta?{' '}
              <button type="button" onClick={() => navigate('login')} className={`underline ${darkMode ? 'text-white hover:text-white/70' : 'text-black'}`}>
                Inicia sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
