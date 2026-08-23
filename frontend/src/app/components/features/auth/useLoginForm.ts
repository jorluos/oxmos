import { useState } from 'react';
import { useApp } from '../../../context/AppContext';

export function useLoginForm() {
  const { login, navigate } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const ok = await login(email, password);
      if (ok) {
        navigate('landing');
      } else {
        setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
      }
    } catch {
      setError('Ocurrió un error inesperado al intentar iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPw = () => setShowPw(!showPw);

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (error) setError('');
  };

  const handlePasswordChange = (val: string) => {
    setPassword(val);
    if (error) setError('');
  };

  return {
    email,
    password,
    showPw,
    error,
    isLoading,
    handleSubmit,
    toggleShowPw,
    handleEmailChange,
    handlePasswordChange,
  };
}
