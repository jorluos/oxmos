import { useApp } from '../../../context/AppContext';

export function RegisterHeader() {
  const { darkMode } = useApp();

  return (
    <div className="text-center mb-8">
      <h1 className={`text-3xl tracking-[0.3em] font-light mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>OXMOS</h1>
      <p className={`text-sm ${darkMode ? 'text-white/55' : 'text-black/40'}`}>Crea tu cuenta gratuita</p>
    </div>
  );
}
