import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/home/hero-section';
import { MovieCarousel } from '@/components/home/movie-carousel';
import { PromotionalBanner } from '@/components/home/promotional-banner';
import { QuickSearch } from '@/components/home/quick-search';
import { Footer } from '@/components/footer';

export default  function Home() {

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
        <HeroSection />
        <QuickSearch />
        <MovieCarousel title="Now Showing" status="now_showing" />
        <PromotionalBanner />
        <MovieCarousel title="Coming Soon" status="upcoming" />
      </main>
      <Footer />
    </div>
  );
}