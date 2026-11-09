import { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import axios from '../../../../axios';

interface FormState {
  nombres: string;
  apellidos: string;
  cedula: string;
  telefono: string;
  correo: string;
  cumpleanos: string;
  direccion: string;
  password: string;
  confirmPassword: string;
}

export function useRegisterForm() {
  const { register, setCurrentUser, navigate } = useApp();
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [globalError, setGlobalError] = useState('');

  const [form, setForm] = useState<FormState>({
    nombres: '',
    apellidos: '',
    cedula: '',
    telefono: '',
    correo: '',
    cumpleanos: '',
    direccion: '',
    password: '',
    confirmPassword: '',
  });

  const update = (field: keyof FormState, val: string) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
    setGlobalError('');
  };

  const validate = (): boolean => {
    const errs: Partial<FormState> = {};
    if (!form.nombres.trim()) errs.nombres = 'Ingresa tus nombres';
    if (!form.apellidos.trim()) errs.apellidos = 'Ingresa tus apellidos';
    if (!form.cedula.trim()) errs.cedula = 'Ingresa tu número de cédula';
    if (!form.telefono.trim()) errs.telefono = 'Ingresa tu teléfono';
    if (!form.correo.trim() || !form.correo.includes('@')) errs.correo = 'Ingresa un correo válido';
    if (!form.password || form.password.length < 8) errs.password = 'La contraseña debe tener al menos 8 caracteres';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Las contraseñas no coinciden';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register({
        first_name: form.nombres,
        last_name: form.apellidos,
        email: form.correo,
        password: form.password,
        password_confirmation: form.confirmPassword,
        phone: form.telefono,
        document_number: form.cedula,
        birth_date: form.cumpleanos,
      });

      const { data } = await axios.get('/api/user', { withCredentials: true });
      setCurrentUser(data.data ?? data);
      navigate('landing');
    } catch (error: any) {
      if (error.response?.status === 422) {
        const backendErrors = error.response.data?.errors;
        if (backendErrors?.email) {
          setErrors(prev => ({ ...prev, correo: backendErrors.email[0] }));
        } else {
          setGlobalError('Los datos ingresados no son válidos. Por favor, revisa el formulario.');
        }
      } else {
        setGlobalError('Ocurrió un error inesperado al registrar el usuario.');
      }
    }
  };

  const toggleShowPw = () => setShowPw(!showPw);

  return {
    form,
    showPw,
    errors,
    globalError,
    update,
    handleSubmit,
    toggleShowPw,
  };
}
