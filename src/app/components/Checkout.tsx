import { useState } from 'react';
import { ChevronLeft, Package, CheckCircle, ArrowRight } from 'lucide-react';
import { useApp } from './AppContext';
import { formatPrice } from './data';

export function Checkout() {
  const { cart, cartTotal, getProduct, currentUser, addOrder, clearCart, navigate, darkMode } = useApp();
  const [step, setStep] = useState<'info' | 'summary' | 'success'>(cart.length === 0 ? 'success' : 'info');
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    nombres: currentUser?.nombres ?? '',
    apellidos: currentUser?.apellidos ?? '',
    cedula: currentUser?.cedula ?? '',
    telefono: currentUser?.telefono ?? '',
    correo: currentUser?.correo ?? '',
    direccion: currentUser?.direccion ?? '',
    ciudad: '',
    notas: '',
  });
  const [errors, setErrors] = useState<Partial<typeof form>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.nombres.trim()) e.nombres = 'Requerido';
    if (!form.apellidos.trim()) e.apellidos = 'Requerido';
    if (!form.cedula.trim()) e.cedula = 'Requerido';
    if (!form.telefono.trim()) e.telefono = 'Requerido';
    if (!form.correo.trim() || !form.correo.includes('@')) e.correo = 'Correo inválido';
    if (!form.direccion.trim()) e.direccion = 'Requerido';
    if (!form.ciudad.trim()) e.ciudad = 'Requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setStep('summary');
  };

  const handleConfirm = () => {
    const id = addOrder({
      userId: currentUser?.id,
      customerName: `${form.nombres} ${form.apellidos}`,
      customerPhone: form.telefono,
      customerAddress: `${form.direccion}, ${form.ciudad}`,
      customerEmail: form.correo,
      items: cart,
      total: cartTotal,
      status: 'Pendiente',
      notes: form.notas,
    });
    setOrderId(id);
    clearCart();
    setStep('success');
  };

  const Field = ({
    label, name, type = 'text', placeholder = '', required = true,
  }: {
    label: string; name: keyof typeof form; type?: string; placeholder?: string; required?: boolean;
  }) => (
    <div>
      <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>{label}{required && ' *'}</label>
      <input
        type={type}
        value={form[name]}
        onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => ({ ...er, [name]: '' })); }}
        placeholder={placeholder}
        className={`w-full border px-4 py-3 text-sm outline-none transition-colors ${
          errors[name] ? 'border-red-400' : 'border-black/20 focus:border-black'
        }`}
      />
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name]}</p>}
    </div>
  );

  if (step === 'success') {
    if (cart.length === 0 && !orderId) {
      return (
        <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
          <Package size={48} className="text-black/20 mb-4" />
          <h2 className="mb-2">Tu carrito está vacío</h2>
          <p className={`text-sm mb-6 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>Agrega productos antes de continuar.</p>
          <button onClick={() => navigate('catalog')} className={`px-8 py-3 text-sm tracking-widest uppercase ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}` }>
            Ir a la tienda
          </button>
        </div>
      );
    }
    return (
      <div className="pt-24 min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${darkMode ? 'bg-white' : 'bg-black'}`}>
          <CheckCircle size={32} className={darkMode ? 'text-black' : 'text-white'} />
        </div>
        <span className={`text-xs tracking-[0.4em] uppercase mb-2 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Pedido confirmado</span>
        <h2 className={`text-3xl mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{orderId}</h2>
        <p className={`text-sm max-w-md leading-relaxed mb-8 ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
          Tu pedido fue recibido exitosamente. Nos comunicaremos contigo pronto para coordinar la entrega. <strong>Recuerda: pagas al recibir tu pedido.</strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('catalog')}
            className="bg-black text-white px-8 py-3 text-sm tracking-widest uppercase hover:bg-black/80 transition-colors"
          >
            Seguir comprando
          </button>
          <a
            href="https://wa.me/573000000000?text=Hola!%20Acabo%20de%20realizar%20el%20pedido%20"
            target="_blank"
            rel="noopener noreferrer"
            className={`border px-8 py-3 text-sm tracking-widest uppercase transition-colors ${darkMode ? 'border-white text-black hover:bg-white hover:text-black' : 'border-black text-black hover:bg-black hover:text-white'}` }
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <button onClick={() => navigate('catalog')} className={`flex items-center gap-1 text-xs mb-8 ${darkMode ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'}`}>
          <ChevronLeft size={14} /> Volver a la tienda
        </button>

        <h1 className={`mb-8 ${darkMode ? 'text-white' : 'text-black'}`}>Finalizar Compra</h1>

        {/* Step indicator */}
        <div className={`flex items-center gap-2 mb-10 text-xs ${darkMode ? 'text-white' : 'text-black'}`}>
          {['Tus datos', 'Confirmación'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                (step === 'info' && i === 0) || (step === 'summary' && i === 1)
                  ? 'bg-black text-white'
                  : (step === 'summary' && i === 0)
                  ? 'bg-black/20 text-black'
                  : 'border border-black/20 text-black/30'
              }`}>
                {i + 1}
              </div>
              <span className={step === (i === 0 ? 'info' : 'summary') ? 'text-black' : 'text-black/30'}>{s}</span>
              {i < 1 && <div className="w-8 h-px bg-black/10" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form / Summary */}
          <div className="lg:col-span-3">
            {step === 'info' ? (
              <div className="space-y-5">
                <h3 className={`border-b pb-3 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>Datos personales</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Nombres" name="nombres" />
                  <Field label="Apellidos" name="apellidos" />
                  <Field label="Número de cédula" name="cedula" />
                  <Field label="Teléfono / WhatsApp" name="telefono" type="tel" />
                  <Field label="Correo electrónico" name="correo" type="email" />
                </div>

                <h3 className={`border-b pb-3 pt-2 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>Dirección de entrega</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Field label="Dirección completa" name="direccion" placeholder="Calle, Carrera, #..." />
                  </div>
                  <Field label="Ciudad / Municipio" name="ciudad" />
                </div>

                <div>
                  <label className={`block text-xs tracking-wide uppercase mb-1.5 ${darkMode ? 'text-white/50' : 'text-black/50'}`}>Notas adicionales</label>
                  <textarea
                    value={form.notas}
                    onChange={e => setForm(f => ({ ...f, notas: e.target.value }))}
                    placeholder="Instrucciones especiales de entrega, apartamento, etc."
                    rows={3}
                    className="w-full border border-black/20 focus:border-black px-4 py-3 text-sm outline-none resize-none"
                  />
                </div>

                <div className={`border p-4 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-black/3 border-black/10'}`}>
                  <p className={`text-xs ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
                    🔒 Tus datos están seguros. Solo los usamos para procesar tu pedido.
                  </p>
                </div>

                <button
                  onClick={handleSubmit}
                  className={`w-full py-4 text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-colors ${darkMode ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-black/80'}` }
                >
                  Revisar pedido <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                <h3 className={`border-b pb-3 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>Confirmar pedido</h3>
                <div className={`border p-4 space-y-1.5 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-black/3 border-black/10'}`}>
                  <p className={`text-sm ${darkMode ? 'text-white' : 'text-black'}`}><strong>{form.nombres} {form.apellidos}</strong></p>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-black/60'}`}>📱 {form.telefono} · ✉️ {form.correo}</p>
                  <p className={`text-sm ${darkMode ? 'text-white/60' : 'text-black/60'}`}>📍 {form.direccion}, {form.ciudad}</p>
                  {form.notas && <p className={`text-sm ${darkMode ? 'text-white/50' : 'text-black/50'}`}>📝 {form.notas}</p>}
                </div>

                <div className={`border p-4 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
                  <p className={`text-xs tracking-widest uppercase mb-3 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Método de pago</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center text-xl ${darkMode ? 'bg-white/10' : 'bg-black/5'}`}>💳</div>
                    <div>
                      <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Pago contra entrega</p>
                      <p className={`text-xs ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Pagas en efectivo o con datafono cuando recibes tu pedido</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('info')}
                    className={`flex-1 border py-3 text-sm transition-colors ${darkMode ? 'border-white/20 hover:border-white text-white' : 'border-black/20 hover:border-black text-black'}`}>
                    Editar datos
                  </button>
                  <button
                    onClick={handleConfirm}
                    className={`flex-1 py-3 text-sm tracking-widest uppercase transition-colors ${darkMode ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-black/80'}`}>
                    Confirmar pedido
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <div className={`border p-5 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
              <h3 className={`border-b pb-3 mb-4 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>Resumen del pedido</h3>
              <div className="space-y-4 max-h-72 overflow-y-auto mb-4">
                {cart.map((item, idx) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <div key={idx} className="flex gap-3">
                      <div className={`w-16 h-20 flex-shrink-0 overflow-hidden relative ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <img src={product.frontImage} alt={product.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${darkMode ? 'text-white' : 'text-black'}`}>{product.name}</p>
                        <p className={`text-xs mt-0.5 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>Talla {item.size}</p>
                        <p className={`text-sm font-medium mt-1 ${darkMode ? 'text-white' : 'text-black'}`}>{formatPrice(product.price * item.quantity)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={`border-t pt-4 space-y-2 ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
                <div className="flex justify-between text-sm">
                  <span className={darkMode ? 'text-white/60' : 'text-black/60'}>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Envío</span>
                  <span className={darkMode ? 'text-white/40' : 'text-black/40'}>Por calcular</span>
                </div>
                <div className={`flex justify-between text-base pt-2 border-t ${darkMode ? 'border-white/10' : 'border-black/10'}`}>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Total</span>
                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>
              </div>
              <p className={`text-[11px] mt-4 leading-relaxed ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
                El costo de envío se calcula según tu ciudad y se cobrará junto con el pedido al momento de entrega.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
