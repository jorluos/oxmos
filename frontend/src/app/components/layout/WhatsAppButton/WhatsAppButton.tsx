import { MessageCircle } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export function WhatsAppButton() {
  const { darkMode } = useApp();
  const phoneNumber = '573166932158';
  const message = encodeURIComponent('¡Hola! Me gustaría recibir información sobre las prendas de OXMOS.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-all hover:scale-105 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={22} className="fill-white" />
      <span className="text-xs font-medium tracking-wide hidden group-hover:inline-block transition-all">
        ¿Necesitas ayuda?
      </span>
    </a>
  );
}
