import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const SECTIONS = [
  {
    id: 'cambios',
    title: 'Política de Cambios',
    content: `En OXMOS queremos que estés completamente satisfecho con tu compra. Por eso, ofrecemos cambios sin costo adicional dentro de los primeros 30 días calendario desde la fecha de entrega.

**Condiciones para cambios:**
• La prenda debe estar en perfectas condiciones, sin uso, sin marcas de uso, aromas o manchas.
• Debe conservar todas sus etiquetas originales.
• Debe presentarse con el empaque original o equivalente.
• Se debe adjuntar el comprobante de compra o número de pedido.

**Proceso de cambio:**
1. Comunícate con nosotros por WhatsApp al número de atención al cliente.
2. Indica tu número de pedido y el motivo del cambio.
3. Coordinaremos el recogido del producto en tu dirección.
4. Una vez recibido y validado, enviamos el nuevo producto.

**Tallas disponibles:** El cambio aplica por talla o color del mismo producto, sujeto a disponibilidad de inventario.`,
  },
  {
    id: 'devoluciones',
    title: 'Política de Devoluciones',
    content: `Aceptamos devoluciones dentro de los primeros 15 días calendario después de recibir tu pedido, bajo las siguientes condiciones.

**Casos en los que aplica devolución:**
• Producto defectuoso o con falla de fabricación.
• Producto diferente al pedido (error en el envío).
• Daño evidente durante el transporte.

**Condiciones generales:**
• La prenda no debe haber sido usada.
• Debe conservar etiquetas y empaque original.
• Debes tener el comprobante del pedido.

**Proceso de devolución:**
1. Reporta el caso dentro de las primeras 48 horas de recibido el producto.
2. Envía fotos del defecto o error por WhatsApp.
3. Coordinaremos el recogido sin costo para ti.
4. Una vez validado el caso, realizaremos la devolución del dinero o el reenvío del producto correcto.

**Tiempo de reembolso:** 5-10 días hábiles una vez confirmada la devolución.`,
  },
  {
    id: 'envios',
    title: 'Política de Envíos',
    content: `Hacemos envíos a todo el territorio colombiano. Trabajamos con las principales transportadoras del país para garantizar la entrega segura de tu pedido.

**Tiempos de entrega:**
• Bogotá y área metropolitana: 1-3 días hábiles
• Ciudades principales (Medellín, Cali, Barranquilla, etc.): 2-4 días hábiles
• Municipios y zonas rurales: 4-8 días hábiles

**Costos de envío:**
Los costos de envío varían según la ciudad de destino y son calculados al momento de confirmar el pedido. En compras superiores a $300.000 COP, el envío puede ser gratuito en ciudades principales.

**Seguimiento del pedido:**
Una vez despachado tu pedido, recibirás por WhatsApp o correo electrónico el número de guía para hacer seguimiento en línea.

**Responsabilidad:**
OXMOS no se hace responsable por demoras causadas por situaciones externas fuera de nuestro control (huelgas, desastres naturales, etc.).`,
  },
  {
    id: 'pago',
    title: 'Método de Pago: Contra Entrega',
    content: `OXMOS opera exclusivamente bajo la modalidad de pago contra entrega. Esto significa que pagas en el momento en que recibes tu pedido, sin necesidad de transferencias o pagos por adelantado.

**¿Cómo funciona?**
1. Realizas tu pedido en nuestra tienda online y completas tus datos.
2. Nuestro equipo confirma el pedido y lo prepara para el envío.
3. La transportadora entrega el paquete en tu dirección.
4. En el momento de la entrega, realizas el pago en efectivo o con datafono (disponible en algunas ciudades).

**Ventajas:**
• Sin riesgo de fraude o estafas.
• Pagas solo cuando ves y recibes tu producto.
• Sin comisiones adicionales por el método de pago.

**Importante:**
• Ten el dinero exacto o disponible al momento de la entrega.
• Si no puedes recibir el pedido, comunícate con anticipación para reprogramar.
• Rechazar un pedido sin causa válida puede limitar futuras compras.`,
  },
  {
    id: 'privacidad',
    title: 'Política de Privacidad',
    content: `En OXMOS, la privacidad de tus datos es una prioridad. Solo recopilamos la información estrictamente necesaria para procesar tus pedidos y brindarte un mejor servicio.

**Datos que recopilamos:**
• Nombres y apellidos
• Número de cédula (para confirmación de identidad)
• Teléfono y correo electrónico
• Dirección de entrega
• Fecha de cumpleaños (para beneficios especiales)

**Uso de la información:**
• Procesar y gestionar tus pedidos
• Comunicarnos contigo sobre el estado de tu pedido
• Enviarte información sobre ofertas y novedades (solo si autorizas)
• Cumplir con obligaciones legales

**Protección de datos:**
• No vendemos ni compartimos tu información con terceros.
• Puedes solicitar la eliminación de tus datos en cualquier momento.
• Usamos medidas de seguridad para proteger tu información.

Conforme a la Ley 1581 de 2012 y el Decreto 1377 de 2013 de protección de datos personales en Colombia.`,
  },
];

export function Policies() {
  const [open, setOpen] = useState<string | null>('cambios');

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.4em] uppercase text-black/40">Legal & Servicio</span>
          <h1 className="mt-2">Políticas y Condiciones</h1>
          <p className="text-black/50 text-sm mt-3 max-w-lg mx-auto">
            Conoce nuestras políticas de cambios, devoluciones, envíos y más. Tu satisfacción es nuestra prioridad.
          </p>
        </div>

        {/* Quick cards */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { icon: '🔄', label: '30 días\npara cambios', color: 'bg-black' },
            { icon: '🚚', label: 'Envío a todo\nColombia', color: 'bg-black/80' },
            { icon: '💳', label: 'Pago contra\nentrega', color: 'bg-black/60' },
          ].map(card => (
            <div key={card.label} className={`${card.color} text-white p-4 text-center`}>
              <div className="text-2xl mb-2">{card.icon}</div>
              <p className="text-xs leading-snug whitespace-pre-line">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-2">
          {SECTIONS.map(section => (
            <div key={section.id} className="border border-black/10">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-black/2 transition-colors"
                onClick={() => setOpen(open === section.id ? null : section.id)}
              >
                <span className="text-sm font-medium tracking-wide">{section.title}</span>
                {open === section.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {open === section.id && (
                <div className="px-5 pb-5 border-t border-black/10">
                  <div className="pt-4 text-sm text-black/60 leading-relaxed whitespace-pre-wrap">
                    {section.content.split('\n').map((line, i) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return <p key={i} className="font-medium text-black mt-3 mb-1">{line.replace(/\*\*/g, '')}</p>;
                      }
                      if (line.startsWith('•')) {
                        return <p key={i} className="flex gap-2 mt-1"><span>•</span><span>{line.slice(1).trim()}</span></p>;
                      }
                      if (line.match(/^\d\./)) {
                        return <p key={i} className="mt-1 ml-4">{line}</p>;
                      }
                      if (line === '') return <div key={i} className="h-2" />;
                      return <p key={i}>{line}</p>;
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 bg-black text-white p-6 text-center">
          <p className="text-xs tracking-widest uppercase text-white/60 mb-2">¿Tienes preguntas?</p>
          <p className="text-white/80 text-sm mb-4">
            Nuestro equipo está disponible para ayudarte de lunes a sábado.
          </p>
          <a
            href="https://wa.me/573000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-white/30 px-6 py-3 text-sm hover:bg-white hover:text-black transition-colors"
          >
            💬 Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
