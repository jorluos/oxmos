import { useApp } from '../context/AppContext';
import { Field } from './Field';
import { useRegisterForm } from './RegisterComponents/useRegisterForm';
import { RegisterHeader } from './RegisterComponents/RegisterHeader';
import { PasswordField } from './RegisterComponents/PasswordField';
import { TermsDisclaimer } from './RegisterComponents/TermsDisclaimer';
import { LoginRedirect } from './RegisterComponents/LoginRedirect';

export function Register() {
  const { darkMode } = useApp();
  const {
    form,
    showPw,
    errors,
    globalError,
    update,
    handleSubmit,
    toggleShowPw,
  } = useRegisterForm();

  return (
    <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-[#09090b] text-white' : 'bg-[#f7f5f2] text-black'}`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute -top-20 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full blur-3xl ${darkMode ? 'bg-white/5' : 'bg-black/5'}`} />
      </div>

      <div className="relative max-w-lg mx-auto px-4 py-12">
        <div className={`rounded-3xl border p-8 sm:p-10 shadow-2xl backdrop-blur-sm ${
          darkMode ? 'border-white/10 bg-white/[0.04]' : 'border-black/10 bg-white'
        }`}>
          <RegisterHeader />

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

            <PasswordField
              label="Contraseña"
              value={form.password}
              error={errors.password}
              onChange={(val) => update('password', val)}
              placeholder="Mínimo 8 caracteres"
              showToggle
              showPw={showPw}
              onToggleShowPw={toggleShowPw}
            />

            <PasswordField
              label="Confirmar contraseña"
              value={form.confirmPassword}
              error={errors.confirmPassword}
              onChange={(val) => update('confirmPassword', val)}
              placeholder="Repite tu contraseña"
            />

            {globalError && (
              <p className={`text-sm text-center border py-2 px-3 rounded-lg ${darkMode ? 'text-red-200 bg-red-500/10 border-red-400/20' : 'text-red-500 bg-red-50 border-red-200'}`}>
                {globalError}
              </p>
            )}

            <TermsDisclaimer />

            <button
              type="submit"
              className={`w-full py-4 text-sm tracking-widest uppercase transition-colors ${
                darkMode ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              Crear cuenta
            </button>

            <LoginRedirect />
          </form>
        </div>
      </div>
    </div>
  );
}
