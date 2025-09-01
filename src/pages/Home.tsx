import { lazy, Suspense } from 'react';
import Hero from '../components/Home/Hero';
import StartSection from '../components/Home/Start';

// Lazy load components that are below the fold for better performance
const AccommodationSection = lazy(() => import('../components/Home/AccommodationSection'));
const DiningSection = lazy(() => import('../components/Home/DiningSection'));
const EventsIntroSection = lazy(() => import('../components/Home/Events'));
const Destinations = lazy(() => import('../components/Home/Destinations'));
const ContactSection = lazy(() => import('../components/Home/ContactSection'));

// Loading component for below-the-fold sections
const SectionLoader = () => (
  <div className="flex items-center justify-center py-16">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
  </div>
);

const Home = () => {
  return (
    <div>
      {/* Above the fold - Load immediately */}
      <Hero />
      <StartSection />
      
      {/* Below the fold - Lazy load for better performance */}
      <Suspense fallback={<SectionLoader />}>
        <AccommodationSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <DiningSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <EventsIntroSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <Destinations />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ContactSection />
      </Suspense>
    </div>
  );
};

export default Home;
