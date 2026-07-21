import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import axios from '../../../axios';

export function useRegisterForm() {
  const { setCurrentUser, navigate } = useApp();
  const [form, setForm] = useState({
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
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState('');

  const update = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    setGlobalError('');
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nombres.trim()) e.nombres = 'Requerido';
    if (!form.apellidos.trim()) e.apellidos = 'Requerido';
    if (!form.cedula.trim() || form.cedula.length < 6) e.cedula = 'Ingresa un número válido';
    if (!form.telefono.trim() || form.telefono.length < 7) e.telefono = 'Ingresa un número válido';
    if (!form.correo.trim() || !form.correo.includes('@')) e.correo = 'Correo inválido';
    if (!form.cumpleanos) e.cumpleanos = 'Requerido';
    if (!form.direccion.trim()) e.direccion = 'Requerido';
    if (!form.password || form.password.length < 8) e.password = 'Mínimo 8 caracteres';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Las contraseñas no coinciden';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

      await axios.post(
        '/api/register',
        {
          first_name: form.nombres,
          last_name: form.apellidos,
          document_number: form.cedula,
          phone: form.telefono,
          email: form.correo,
          birth_date: form.cumpleanos,
          password: form.password,
          password_confirmation: form.confirmPassword,
        },
        { withCredentials: true }
      );

      const { data } = await axios.get('/api/user', { withCredentials: true });
      setCurrentUser(data.data ?? data);
      navigate('catalog');
    } catch (error: any) {
      if (error?.response?.status === 422) {
        const backendErrors = error.response.data?.errors;
        if (backendErrors?.email) {
          setGlobalError('El correo electrónico ya está registrado. Intenta con otro o inicia sesión.');
        } else if (backendErrors?.document_number) {
          setGlobalError('El número de cédula ya se encuentra registrado.');
        } else {
          setGlobalError('No se pudo registrar. Verifica los datos ingresados.');
        }
      } else if (!error?.response) {
        setGlobalError('No se pudo conectar con el servidor backend (http://localhost:8000). Verifica que el servidor Laravel esté activo.');
      } else {
        setGlobalError(`No se pudo crear la cuenta (Error ${error?.response?.status}). Inténtalo de nuevo.`);
      }
    }
  };

  const toggleShowPw = () => setShowPw(v => !v);

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
