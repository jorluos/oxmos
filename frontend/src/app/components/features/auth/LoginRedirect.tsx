import { useApp } from '../../../context/AppContext';

export function LoginRedirect() {
  const { navigate } = useApp();

  return (
    <p className="text-center text-xs opacity-60">
      ¿Ya tienes una cuenta?{' '}
      <button
        type="button"
        onClick={() => navigate('login')}
        className="font-medium underline hover:opacity-100 transition-opacity"
      >
        Inicia sesión aquí
      </button>
    </p>
  );
}
