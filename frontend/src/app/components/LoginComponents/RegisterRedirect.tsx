import { useApp } from '../../context/AppContext';

export function RegisterRedirect() {
  const { darkMode, navigate } = useApp();

  return (
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
  );
}
