import React from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useCheckout } from '../components/features/checkout/useCheckout';
import { CheckoutForm } from '../components/features/checkout/CheckoutForm';
import { CheckoutConfirmation } from '../components/features/checkout/CheckoutConfirmation';
import { OrderSummary } from '../components/features/checkout/OrderSummary';

export function CheckoutPage() {
  const { cart, cartTotal, getProduct, navigate, darkMode } = useApp();
  const {
    step,
    setStep,
    orderId,
    form,
    errors,
    handleFieldChange,
    handleSubmit,
    handleConfirm,
  } = useCheckout();

  if (step === 'success') {
    return (
      <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="max-w-xl mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <span className={`text-xs tracking-[0.4em] uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
            ¡Gracias por tu compra!
          </span>
          <h1 className="text-3xl font-light mt-2 mb-3">Pedido confirmado</h1>
          <p className={`text-sm mb-2 ${darkMode ? 'text-white/60' : 'text-black/60'}`}>
            Número de pedido: <strong>#{orderId || '000000'}</strong>
          </p>
          <p className={`text-xs max-w-md mx-auto leading-relaxed mb-8 ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
            Hemos recibido tu pedido. Nos pondremos en contacto vía WhatsApp o correo para confirmar el envío. Recuerda que pagas al recibir.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('catalog')}
              className={`px-8 py-3 text-sm tracking-widest uppercase transition-colors ${
                darkMode ? 'bg-white text-black hover:bg-white/80' : 'bg-black text-white hover:bg-black/80'
              }`}
            >
              Seguir comprando
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`pt-16 min-h-screen transition-colors ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => (step === 'summary' ? setStep('info') : navigate('catalog'))}
          className={`flex items-center gap-2 text-xs tracking-widest uppercase mb-8 transition-colors ${
            darkMode ? 'text-white/40 hover:text-white' : 'text-black/40 hover:text-black'
          }`}
        >
          <ChevronLeft size={14} />
          {step === 'summary' ? 'Volver a datos' : 'Seguir comprando'}
        </button>

        <div className="mb-8">
          <span className={`text-xs tracking-[0.4em] uppercase ${darkMode ? 'text-white/40' : 'text-black/40'}`}>
            Finalizar compra
          </span>
          <h1 className="text-3xl font-light mt-1">
            {step === 'info' ? 'Datos de entrega' : 'Confirmación'}
          </h1>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-4 mb-10 text-xs">
          <span className={`flex items-center gap-1.5 ${step === 'info' ? 'font-medium' : darkMode ? 'text-white/40' : 'text-black/40'}`}>
            <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
              step === 'info'
                ? darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'
                : 'border-current'
            }`}>1</span>
            Información
          </span>
          <span className={darkMode ? 'text-white/20' : 'text-black/20'}>——</span>
          <span className={`flex items-center gap-1.5 ${step === 'summary' ? 'font-medium' : darkMode ? 'text-white/40' : 'text-black/40'}`}>
            <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
              step === 'summary'
                ? darkMode ? 'border-white bg-white text-black' : 'border-black bg-black text-white'
                : 'border-current'
            }`}>2</span>
            Confirmación
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Main Form/Confirmation */}
          <div className="lg:col-span-3">
            {step === 'info' ? (
              <CheckoutForm
                form={form}
                errors={errors}
                darkMode={darkMode}
                onChange={handleFieldChange}
                onSubmit={handleSubmit}
                onNotasChange={(val: string) => handleFieldChange('notas', val)}
              />
            ) : (
              <CheckoutConfirmation
                form={form}
                darkMode={darkMode}
                onEdit={() => setStep('info')}
                onConfirm={handleConfirm}
              />
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <OrderSummary
              cart={cart}
              cartTotal={cartTotal}
              getProduct={getProduct}
              darkMode={darkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { CheckoutPage as Checkout };
