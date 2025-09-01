import React, { useState, useCallback, useMemo, memo } from 'react';
import LazyImage from '../ui/LazyImage';

// =================================================================
// == SVG ICONS
// =================================================================
const ArrowRightIcon = memo(() => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
));

ArrowRightIcon.displayName = 'ArrowRightIcon';

// =================================================================
// == DATA STRUCTURES
// =================================================================
interface Destination {
  id: number;
  title: string;
  description: string;
  image: string;
  distance: string;
  category: string;
}

// =================================================================
// == OPTIMIZED SECTION HEADER
// =================================================================
const SectionHeader = memo(() => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="w-12 h-0.5 bg-accent" />
      <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
        Explore Our Surroundings
      </p>
      <div className="w-12 h-0.5 bg-accent" />
    </div>
    <div className="animate-float">
      <h2 className="text-h2 font-playfair text-foreground mb-6 relative inline-block">
        Find Us in the Heart of Thiruvananthapuram
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-accent" />
      </h2>
    </div>
    <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto leading-relaxed mt-8">
      Nestled in Thycaud, Amritha Heritage is just minutes from key cultural and historical landmarks
    </p>
  </div>
));

SectionHeader.displayName = 'SectionHeader';

// =================================================================
// == OPTIMIZED DESTINATION CARD COMPONENT
// =================================================================
const DestinationCard = memo<{ destination: Destination; index: number }>(({ destination, index }) => {
  return (
    <div className="group relative bg-background-secondary rounded-2xl lg:rounded-3xl shadow-soft-sunlight-lg overflow-hidden hover:shadow-golden-glow transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]">
      {/* Image Container */}
      <div className="h-56 lg:h-64 overflow-hidden">
        <LazyImage 
          src={destination.image} 
          alt={destination.title} 
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <div className="p-4 lg:p-6">
        <span className="font-poppins text-sm text-accent uppercase tracking-wide font-medium">
          {destination.category}
        </span>
        <div className="animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
          <h3 className="font-playfair text-xl lg:text-2xl font-bold text-foreground mt-2 group-hover:text-accent transition-colors duration-300">
            {destination.title}
          </h3>
        </div>
        <p className="font-cormorant text-foreground-subtle my-4 leading-relaxed">
          {destination.description}
        </p>
        <div className="inline-flex items-center gap-2 text-sm text-accent font-medium group-hover:scale-105 transition-transform duration-300">
          <span>
            {destination.distance} away
          </span>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
});

DestinationCard.displayName = 'DestinationCard';

// =================================================================
// == OPTIMIZED MOBILE SLIDER
// =================================================================
const MobileSlider = memo<{ 
  destinations: Destination[]; 
  mobileIndex: number; 
  onIndexChange: (index: number) => void;
}>(({ destinations, mobileIndex, onIndexChange }) => {
  const mobileDestination = destinations[mobileIndex];

  return (
    <div className="lg:hidden relative h-72">
      <div className="absolute inset-0 w-full h-full bg-background-secondary rounded-2xl overflow-hidden">
        <LazyImage 
          src={mobileDestination.image} 
          alt={mobileDestination.title} 
          className="w-full h-full object-cover"
          quality={75}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <p className="font-poppins text-sm text-accent uppercase">
            {mobileDestination.category}
          </p>
          <div className="animate-float">
            <h3 className="font-playfair text-xl font-bold text-white mt-2">
              {mobileDestination.title}
            </h3>
          </div>
          <p className="font-cormorant text-white/80 mt-4">
            {mobileDestination.description}
          </p>
          <div className="inline-flex items-center gap-2 text-sm text-accent font-medium mt-4">
            <span>
              {mobileDestination.distance} away
            </span>
          </div>
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {destinations.map((_, i) => (
          <button
            key={i}
            onClick={() => onIndexChange(i)}
            className={`rounded-full transition-all duration-300 ${
              i === mobileIndex 
                ? 'w-6 h-2 bg-accent' 
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to destination ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

MobileSlider.displayName = 'MobileSlider';

// =================================================================
// == MAIN COMPONENT
// =================================================================
const DestinationSection: React.FC = () => {
  const [mobileIndex, setMobileIndex] = useState(0);

  // Memoized destinations data
  const destinations = useMemo<Destination[]>(() => [
    { 
      id: 1, 
      title: "Shri Padmanabhaswami Temple", 
      description: "A stunning example of Dravidian architecture, this temple is a spiritual heart of the city, dedicated to Vishnu.", 
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=800&fit=crop&q=80", 
      distance: "5 km", 
      category: "Heritage" 
    },
    { 
      id: 2, 
      title: "Kovalam Beach", 
      description: "Famous for its three crescent-shaped beaches, offering a serene escape with golden sands and calm waters.", 
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80", 
      distance: "16 km", 
      category: "Beach" 
    },
    { 
      id: 3, 
      title: "Veli Tourist Village", 
      description: "A picturesque spot where the Veli Lake meets the Arabian Sea, offering boating, gardens, and a floating bridge.", 
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80", 
      distance: "8 km", 
      category: "Adventure" 
    },
  ], []);

  // Optimized event handlers
  const handleMobileIndexChange = useCallback((index: number) => {
    setMobileIndex(index);
  }, []);

  const handleExploreAll = useCallback(() => {
    window.open('/destinations', '_self');
  }, []);

  return (
    <section className="bg-gradient-to-br from-background via-background-secondary/30 to-background py-16 md:py-24 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-accent rounded-full animate-float" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-10 w-16 h-16 border border-accent rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-6 lg:px-8">
        <SectionHeader />

        {/* Desktop Destinations Grid */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              index={index}
            />
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="lg:hidden mb-12">
          <MobileSlider 
            destinations={destinations}
            mobileIndex={mobileIndex}
            onIndexChange={handleMobileIndexChange}
          />
        </div>

        {/* Explore All Destinations Button */}
        <div className="text-center">
          <div className="animate-float">
            <button
              onClick={handleExploreAll}
              className="btn btn-primary group text-base px-8 py-4 shadow-soft-sunlight-lg hover:shadow-golden-glow hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent active:scale-95 inline-flex items-center gap-2 transition-all duration-300"
            >
              <span>
                Explore All Destinations
              </span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(DestinationSection);
