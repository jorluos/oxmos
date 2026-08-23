import { useApp } from './context/AppContext';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminPanel } from './components/AdminPanel';
import { Cart } from './components/Cart';
import { Catalog } from './components/Catalog';
import { CatalogGenderSelection } from './components/CatalogGenderSelection';
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
  const { currentPage, adminLoggedIn, darkMode } = useApp();

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
    <div className={`min-h-screen flex flex-col transition-colors ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <Header />
      <Cart />
      <main className="flex-1">
        {currentPage === 'landing' && <LandingPage />}
        {currentPage === 'catalog-gender' && <CatalogGenderSelection />}
        {currentPage === 'catalog' && <Catalog />}
        {currentPage === 'product' && <ProductDetail />}
        {currentPage === 'wishlist' && <Wishlist />}
        {currentPage === 'policies' && <Policies />}
        {currentPage === 'login' && <Login />}
        {currentPage === 'register' && <Register />}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
