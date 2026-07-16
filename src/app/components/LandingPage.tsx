import { useApp } from '../context/AppContext';
import { StoreFeatures } from './LandingPageComponents/StoreFeatures';
import { TwoColumnPromo } from './LandingPageComponents/TwoColumnPromo';
import { FavCards } from './LandingPageComponents/FavCards';
import { BigBanner } from './LandingPageComponents/BigBanner';
import { NuevoCards } from './LandingPageComponents/NuevoCards';
import { HeroSlides } from './LandingPageComponents/HeroSlides';
import { Testimonials } from './LandingPageComponents/Testimonials';
import { CtaBanner } from './LandingPageComponents/CtaBanner';

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
      <CtaBanner/>
    </div>
  );
}
