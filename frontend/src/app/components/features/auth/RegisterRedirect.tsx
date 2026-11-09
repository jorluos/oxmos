import { useApp } from '../../../context/AppContext';

export function RegisterRedirect() {
  const { navigate } = useApp();

  return (
    <p className="text-center text-xs opacity-60">
      ¿No tienes una cuenta?{' '}
      <button
        type="button"
        onClick={() => navigate('register')}
        className="font-medium underline hover:opacity-100 transition-opacity"
      >
        Regístrate aquí
      </button>
    </p>
  );
}
