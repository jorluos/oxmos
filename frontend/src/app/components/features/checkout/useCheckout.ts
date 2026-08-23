import { useState } from 'react';
import type { Address } from '../../../types';
import { useApp } from '../../../context/AppContext';

export interface CheckoutFormState {
  nombres: string;
  apellidos: string;
  cedula: string;
  telefono: string;
  correo: string;
  direccion: string;
  ciudad: string;
  notas: string;
}

export type CheckoutErrors = Partial<Record<keyof CheckoutFormState, string>>;

export function useCheckout() {
  const { cart, currentUser, addOrder, clearCart } = useApp();
  const [step, setStep] = useState<'info' | 'summary' | 'success'>(cart.length === 0 ? 'success' : 'info');
  const [orderId, setOrderId] = useState('');

  const defaultAddress = currentUser?.addresses?.find((a: Address) => a.is_default_shipping) ?? currentUser?.addresses?.[0];
  const [form, setForm] = useState<CheckoutFormState>({
    nombres: currentUser?.first_name ?? '',
    apellidos: currentUser?.last_name ?? '',
    cedula: currentUser?.document_number ?? '',
    telefono: currentUser?.phone ?? '',
    correo: currentUser?.email ?? '',
    direccion: defaultAddress?.street_line_1 ?? '',
    ciudad: defaultAddress?.city ?? '',
    notas: '',
  });

  const [errors, setErrors] = useState<CheckoutErrors>({});

  const handleFieldChange = (name: keyof CheckoutFormState, value: string) => {
    setForm(f => ({ ...f, [name]: value }));
    setErrors(er => ({ ...er, [name]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: CheckoutErrors = {};
    if (!form.nombres.trim()) newErrors.nombres = 'Ingresa tus nombres';
    if (!form.apellidos.trim()) newErrors.apellidos = 'Ingresa tus apellidos';
    if (!form.cedula.trim()) newErrors.cedula = 'Ingresa tu cédula';
    if (!form.telefono.trim()) newErrors.telefono = 'Ingresa tu teléfono';
    if (!form.correo.trim() || !form.correo.includes('@')) newErrors.correo = 'Ingresa un correo válido';
    if (!form.direccion.trim()) newErrors.direccion = 'Ingresa tu dirección';
    if (!form.ciudad.trim()) newErrors.ciudad = 'Ingresa tu ciudad';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setStep('summary');
  };

  const handleConfirm = async () => {
    try {
      const newOrderId = await addOrder({
        address_id: defaultAddress?.id ?? 0,
        notes: form.notas,
        payment_method: 'efectivo',
      });
      setOrderId(newOrderId);
      await clearCart();
      setStep('success');
    } catch {
      alert('Hubo un error al procesar el pedido. Por favor intenta de nuevo.');
    }
  };

  return {
    step,
    setStep,
    orderId,
    form,
    setForm,
    errors,
    handleFieldChange,
    handleSubmit,
    handleConfirm,
  };
}
