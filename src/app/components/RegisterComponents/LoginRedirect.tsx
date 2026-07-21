import { useApp } from '../../context/AppContext';

export function LoginRedirect() {
  const { darkMode, navigate } = useApp();

  return (
    <div className={`text-center text-xs ${darkMode ? 'text-white/55' : 'text-black/40'}`}>
      ¿Ya tienes una cuenta?{' '}
      <button
        type="button"
        onClick={() => navigate('login')}
        className={`underline ${darkMode ? 'text-white hover:text-white/70' : 'text-black'}`}
      >
        Inicia sesión
      </button>
    </div>
  );
}
