import { useState } from 'react';
import { useApp } from '../../context/AppContext';

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
      const success = await login(email, password);
      if (success) {
        navigate('catalog');
      } else {
        setError('Correo o contraseña incorrectos.');
      }
    } catch {
      setError('Error al conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPw = () => setShowPw(v => !v);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setError('');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setError('');
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
