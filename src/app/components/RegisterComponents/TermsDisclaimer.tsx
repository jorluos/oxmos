import { useApp } from '../../context/AppContext';

export function TermsDisclaimer() {
  const { darkMode, navigate } = useApp();

  return (
    <p className={`text-xs leading-relaxed ${darkMode ? 'text-white/55' : 'text-black/40'}`}>
      Al registrarte, aceptas nuestros{' '}
      <button
        type="button"
        onClick={() => navigate('policies')}
        className={`underline underline-offset-2 ${darkMode ? 'text-white hover:text-white/70' : 'text-black hover:text-black/60'}`}
      >
        términos y condiciones
      </button>{' '}
      y nuestra{' '}
      <button
        type="button"
        onClick={() => navigate('policies')}
        className={`underline underline-offset-2 ${darkMode ? 'text-white hover:text-white/70' : 'text-black hover:text-black/60'}`}
      >
        política de privacidad
      </button>
      .
    </p>
  );
}
