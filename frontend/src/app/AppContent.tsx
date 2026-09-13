import { useApp } from './context/AppContext';
import { AdminLogin } from './components/features/admin/AdminLogin';
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
  const { currentPage, adminLoggedIn, darkMode } = useApp();

  // Un solo punto de entrada al panel: oxmos.com/admin.
  // Si ya hay una sesión de admin activa (currentPage === 'admin' venga de
  // donde venga: login inicial, recarga de página o "Ver tienda" -> volver),
  // se muestra el panel directamente en vez de pedir credenciales otra vez.
  if (currentPage === 'admin-login' || currentPage === 'admin') {
    return adminLoggedIn ? <AdminPage /> : <AdminLogin />;
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
