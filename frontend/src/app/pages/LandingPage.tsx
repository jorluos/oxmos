import { useApp } from '../context/AppContext';
import { StoreFeatures } from '../components/features/landing/StoreFeatures';
import { TwoColumnPromo } from '../components/features/landing/TwoColumnPromo';
import { FavCards } from '../components/features/landing/FavCards';
import { BigBanner } from '../components/features/landing/BigBanner';
import { NuevoCards } from '../components/features/landing/NuevoCards';
import { HeroSlides } from '../components/features/landing/HeroSlides';
import { Testimonials } from '../components/features/landing/Testimonials';
import { CtaBanner } from '../components/features/landing/CtaBanner';

export function LandingPage() {
  const { darkMode } = useApp();

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <HeroSlides />
      <StoreFeatures />
      <FavCards />
      <BigBanner />
      <NuevoCards />
      <TwoColumnPromo />
      <Testimonials />
      <CtaBanner />
    </div>
  );
}
