import { useApp } from './context/AppContext';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { Cart } from './components/LandingPageComponents/Cart';
import { Catalog } from './components/Catalog';
import { Checkout } from './components/Checkout';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Login } from './components/Login';
import { Policies } from './components/Policies';
import { ProductDetail } from './components/ProductDetail';
import { Register } from './components/Register';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Wishlist } from './components/Wishlist';

export function AppContent() {
  const { currentPage, adminLoggedIn } = useApp();

  if (currentPage === 'admin-login') return <AdminLogin />;
  if (currentPage === 'admin') {
    return adminLoggedIn ? <AdminPanel /> : <AdminLogin />;
  }

  if (currentPage === 'checkout') {
    return (
      <>
        <Header />
        <Cart />
        <Checkout />
        <WhatsAppButton />
      </>
    );
  }

  return (
    <>
      <Header />
      <Cart />
      <main>
        {currentPage === 'landing' && <LandingPage />}
        {currentPage === 'catalog' && <Catalog />}
        {currentPage === 'product' && <ProductDetail />}
        {currentPage === 'wishlist' && <Wishlist />}
        {currentPage === 'policies' && <Policies />}
        {currentPage === 'login' && <Login />}
        {currentPage === 'register' && <Register />}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
