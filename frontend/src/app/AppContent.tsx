import { useEffect } from 'react';
import { useApp } from './context/AppContext';
import { AdminPage } from './pages/AdminPage';
import { Cart } from './components/layout/Cart/Cart';
import { CatalogPage } from './pages/CatalogPage';
import { CatalogGenderPage } from './pages/CatalogGenderPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { Footer } from './components/layout/Footer/Footer';
import { Header } from './components/layout/Header/Header';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { RegisterPage } from './pages/RegisterPage';
import { WhatsAppButton } from './components/layout/WhatsAppButton/WhatsAppButton';
import { WishlistPage } from './pages/WishlistPage';

export function AppContent() {
  const { currentPage, adminLoggedIn, authLoading, navigate, setLoginNotice, darkMode } = useApp();

  // Control de acceso a la ruta admin:
  // Si se intenta acceder a /admin sin sesión de admin, redirigir al login general con aviso
  useEffect(() => {
    if (!authLoading && (currentPage === 'admin' || currentPage === 'admin-login') && !adminLoggedIn) {
      setLoginNotice('Se requieren permisos de administrador para acceder a esa sección.');
      navigate('login');
    }
  }, [currentPage, adminLoggedIn, authLoading, navigate, setLoginNotice]);

  if (currentPage === 'admin' || currentPage === 'admin-login') {
    if (authLoading) {
      return (
        <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin border-current" />
        </div>
      );
    }
    return adminLoggedIn ? <AdminPage /> : null;
  }

  if (currentPage === 'checkout') {
    return (
      <div className={`min-h-screen flex flex-col transition-colors ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <Header />
        <Cart />
        <main className="flex-1">
          <CheckoutPage />
        </main>
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header />
      <Cart />
      <main className="flex-1">
        {currentPage === 'landing' && <LandingPage />}
        {currentPage === 'catalog-gender' && <CatalogGenderPage />}
        {currentPage === 'catalog' && <CatalogPage />}
        {currentPage === 'product' && <ProductDetailPage />}
        {currentPage === 'wishlist' && <WishlistPage />}
        {currentPage === 'policies' && <PoliciesPage />}
        {currentPage === 'login' && <LoginPage />}
        {currentPage === 'register' && <RegisterPage />}
        {currentPage === 'profile' && <ProfilePage />}
        {currentPage === 'forgot-password' && <ForgotPasswordPage />}
        {currentPage === 'reset-password' && <ResetPasswordPage />}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
