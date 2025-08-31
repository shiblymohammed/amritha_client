import React, { useState, useCallback, useMemo, memo } from 'react';

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

// Optimized lazy image component
const LazyImage = memo(({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src={src}
    alt={alt}
    className={className}
    loading="lazy"
    decoding="async"
    {...props}
  />
));

LazyImage.displayName = 'LazyImage';

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
// == DESTINATION CARD COMPONENT
// =================================================================


// Optimized Destination Card Component
const DestinationCard = memo<{ destination: Destination; index: number }>(({ destination, index }) => {

  return (
    <div
      className="card-interactive group relative overflow-hidden img-overlay flex flex-col hover:shadow-golden-glow animate-fade-in-up hover-3d transform transition-all duration-700 hover:-translate-y-2 hover:scale-[1.03]"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="h-64 overflow-hidden">
        <LazyImage 
          src={destination.image} 
          alt={destination.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-br from-background/80 via-background-secondary/70 to-background-tertiary/60 backdrop-blur-sm">
        <span className="font-poppins text-sm text-accent uppercase tracking-wide font-medium animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-[length:400%] bg-clip-text text-transparent">{destination.category}</span>
        <h3 className="font-playfair text-h3-sm text-foreground mt-2 group-hover:text-accent transition-colors duration-300 animate-float">{destination.title}</h3>
        <p className="font-cormorant text-foreground-subtle my-4 flex-grow leading-relaxed animate-fade-in">{destination.description}</p>
        <div className="inline-flex items-center gap-2 text-sm text-accent font-medium">
          <span className="animate-text-shimmer bg-gradient-to-r from-foreground via-accent-gold to-foreground bg-[length:400%] bg-clip-text">
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
// == MAIN COMPONENT
// =================================================================
const DestinationSection: React.FC = () => {
  const [mobileIndex, setMobileIndex] = useState(0);

  // Memoized destinations data
  const destinations = useMemo<Destination[]>(() => [
    { id: 1, title: "Shri Padmanabhaswami Temple", description: "A stunning example of Dravidian architecture, this temple is a spiritual heart of the city, dedicated to Vishnu.", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1200&h=800&fit=crop&q=80", distance: "5 km", category: "Heritage" },
    { id: 2, title: "Kovalam Beach", description: "Famous for its three crescent-shaped beaches, offering a serene escape with golden sands and calm waters.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80", distance: "16 km", category: "Beach" },
    { id: 3, title: "Veli Tourist Village", description: "A picturesque spot where the Veli Lake meets the Arabian Sea, offering boating, gardens, and a floating bridge.", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80", distance: "8 km", category: "Adventure" },
  ], []);

  const mobileDestination = useMemo(() => destinations[mobileIndex], [destinations, mobileIndex]);

  // Optimized event handlers

  const handleMobilePrevious = useCallback(() => {
    setMobileIndex(prev => (prev - 1 + destinations.length) % destinations.length);
  }, [destinations.length]);

  const handleMobileNext = useCallback(() => {
    setMobileIndex(prev => (prev + 1) % destinations.length);
  }, [destinations.length]);

  const handleDragEnd = useCallback((info: { offset: { x: number } }) => {
    if (info.offset.x < -100) {
      handleMobileNext();
    } else if (info.offset.x > 100) {
      handleMobilePrevious();
    }
  }, [handleMobileNext, handleMobilePrevious]);

  const handleExploreAll = useCallback(() => {
    window.open('/destinations', '_self');
  }, []);

  return (
    <section className="bg-gradient-to-br from-background via-background-secondary to-background-tertiary py-24 md:py-40 relative overflow-hidden">
        {/* Optimized Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-accent-gold/3 animate-gradient-flow" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/2" />
        
        {/* Simplified Heritage Decorations */}
        <div className="absolute inset-0 opacity-8 pointer-events-none">
          <div className="absolute top-32 left-32 w-40 h-40 border border-accent-gold/30 rounded-full animate-float shadow-golden-glow-sm" />
          <div className="absolute bottom-32 right-32 w-32 h-32 border border-accent/20 rounded-full animate-tilt-3d" />
          <div className="absolute top-1/3 right-1/5 w-24 h-24 border border-primary/25 rounded-full animate-bounce-gentle" />
          <div className="absolute bottom-1/4 left-1/6 w-28 h-28 border border-accent-gold/20 rounded-full animate-scale-breath" />
        </div>
        
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 md:mb-24 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent animate-gradient-flow" />
              <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-[length:400%] bg-clip-text text-transparent">Explore Our Surroundings</p>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent animate-gradient-flow" />
            </div>
            <h2 className="text-h2 font-playfair text-foreground mb-6 relative inline-block animate-float">
              Find Us in the Heart of Thiruvananthapuram
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
            </h2>
            <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto leading-relaxed mt-8 animate-fade-in">
              Nestled in Thycaud, Amritha Heritage is just minutes from key cultural and historical landmarks
            </p>
          </div>

          {/* Desktop Destinations Grid */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                index={index}
              />
            ))}
          </div>

          {/* Mobile Story Slider */}
          <div className="lg:hidden relative h-[80vh] cursor-grab active:cursor-grabbing">
            <div
              className="absolute inset-0 w-full h-full card-interactive overflow-hidden hover-3d transition-all duration-800 ease-out"
              style={{ backgroundImage: `url(${mobileDestination.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-foreground-on-color bg-gradient-to-t from-black/20 to-transparent backdrop-blur-sm">
                <p className="font-poppins text-sm text-accent-gold uppercase animate-text-shimmer bg-gradient-to-r from-accent-gold via-white to-accent-gold bg-[length:400%] bg-clip-text text-transparent animate-fade-in">{mobileDestination.category}</p>
                <h3 className="font-playfair text-h3 text-foreground-on-color mt-2 animate-float animate-fade-in-up">{mobileDestination.title}</h3>
                <p className="font-cormorant text-foreground-on-color/80 mt-4 animate-fade-in">{mobileDestination.description}</p>
                <div className="inline-flex items-center gap-2 text-sm text-accent-gold font-medium mt-6">
                  <span className="animate-text-shimmer bg-gradient-to-r from-foreground-on-color via-accent-gold to-foreground-on-color bg-[length:400%] bg-clip-text">
                    {mobileDestination.distance} away
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {destinations.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIndex(i)}
                  className={`rounded-full transition-all duration-300 hover-bounce ${i === mobileIndex ? 'w-6 h-2 bg-accent-gold shadow-golden-glow-sm animate-scale-breath' : 'w-2 h-2 bg-white/30 hover:bg-white/50 hover:shadow-golden-glow-sm'}`}
                  aria-label={`Go to destination ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Explore All Destinations Button */}
          <div className="text-center mt-16 animate-fade-in-up">
            <button
              onClick={handleExploreAll}
              className="btn btn-primary group text-lg px-10 py-4 shadow-soft-sunlight-lg hover:shadow-golden-glow animate-float transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent active:scale-95 inline-flex items-center gap-3 transition-all duration-300"
            >
              <span className="animate-text-shimmer bg-gradient-to-r from-foreground-on-color via-accent-gold to-foreground-on-color bg-[length:400%] bg-clip-text">
                Explore All Destinations
              </span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(DestinationSection);
