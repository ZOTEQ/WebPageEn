import HeroSection from '@/sections/HeroSection';
import MissionSection from '@/sections/MissionSection';
import NewLaunchesSection from '@/sections/NewLaunchesSection';
import MarqueeSection from '@/sections/MarqueeSection';
import ExploreGridSection from '@/sections/ExploreGridSection';
import FnfHubCarousel from '@/sections/FnfHubCarousel';
import PartnersSection from '@/sections/PartnersSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MissionSection />
      <NewLaunchesSection />
      <MarqueeSection />
      <ExploreGridSection />
      <FnfHubCarousel />
      <PartnersSection />
    </>
  );
}
