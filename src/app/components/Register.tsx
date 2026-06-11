import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Register() {
  const { register, navigate } = useApp();
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
    if (!form.password || form.password.length < 6) e.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const { confirmPassword, ...userData } = form;
    const success = register(userData);
    if (success) {
      navigate('catalog');
    } else {
      setGlobalError('Este correo ya está registrado.');
    }
  };

  const Field = ({
    label, name, type = 'text', placeholder = '',
  }: {
    label: string; name: keyof typeof form; type?: string; placeholder?: string;
  }) => (
    <div>
      <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">{label} *</label>
      <input
        type={type}
        value={form[name]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          update(name, e.target.value)
        }
        placeholder={placeholder}
        className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${
          errors[name] ? 'border-red-400' : 'border-black/20 focus:border-black'
        }`}
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl tracking-[0.3em] font-light mb-2">OXMOS</h1>
          <p className="text-black/40 text-sm">Crea tu cuenta gratuita</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nombres" name="nombres" placeholder="María" />
            <Field label="Apellidos" name="apellidos" placeholder="García López" />
            <Field label="Número de cédula" name="cedula" placeholder="1234567890" />
            <Field label="Teléfono / WhatsApp" name="telefono" type="tel" placeholder="3001234567" />
          </div>

          <Field label="Correo electrónico" name="correo" type="email" placeholder="tu@correo.com" />
          <Field label="Fecha de cumpleaños" name="cumpleanos" type="date" />
          <Field label="Dirección de residencia" name="direccion" placeholder="Calle, carrera, número, ciudad" />

          <div>
            <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Contraseña *</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={form.password}
                
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  update('password', e.target.value)
                }
                placeholder="Mínimo 6 caracteres"
                className={`w-full border px-4 py-3 text-sm outline-none pr-12 ${
                  errors.password ? 'border-red-400' : 'border-black/20 focus:border-black'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30 hover:text-black"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-xs tracking-wide uppercase text-black/50 mb-1.5">Confirmar contraseña *</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update('confirmPassword', e.target.value)
              }
              placeholder="Repite tu contraseña"
              className={`w-full border px-4 py-3 text-sm outline-none ${
                errors.confirmPassword ? 'border-red-400' : 'border-black/20 focus:border-black'
              }`}
            />
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>

          {globalError && (
            <p className="text-red-500 text-sm text-center bg-red-50 border border-red-200 py-2 px-3">{globalError}</p>
          )}

          <p className="text-xs text-black/40 leading-relaxed">
            Al registrarte, aceptas nuestros{' '}
            <button type="button" onClick={() => navigate('policies')} className="underline hover:text-black">
              términos y condiciones
            </button>{' '}
            y nuestra{' '}
            <button type="button" onClick={() => navigate('policies')} className="underline hover:text-black">
              política de privacidad
            </button>.
          </p>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 text-sm tracking-widest uppercase hover:bg-black/80 transition-colors"
          >
            Crear cuenta
          </button>

          <div className="text-center text-xs text-black/40">
            ¿Ya tienes una cuenta?{' '}
            <button type="button" onClick={() => navigate('login')} className="text-black underline">
              Inicia sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
