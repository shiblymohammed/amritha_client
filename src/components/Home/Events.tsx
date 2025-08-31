import React, { useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';

// Optimized ArrowRightIcon component
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
    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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

// Optimized SectionHeader component with CSS animations
const SectionHeader = memo<{ subtitle: string; title: string; description: string; }>(({ subtitle, title, description }) => (
  <div className="text-center mb-16 animate-fade-in-up">
    <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent animate-gradient-flow" />
      <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-[length:400%] bg-clip-text text-transparent">
        {subtitle}
      </p>
      <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent animate-gradient-flow" />
    </div>
    <h2 className="text-h2 font-playfair text-foreground mb-6 relative inline-block animate-float">
      {title}
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
    </h2>
    <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto leading-relaxed mt-8 animate-fade-in">
      {description}
    </p>
  </div>
));

SectionHeader.displayName = 'SectionHeader';

// Event category interface
interface EventCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  highlight: string;
}

// Optimized Event Card Component
const EventCard = memo<{ category: EventCategory; index: number; onNavigate: (id: string) => void }>(({ category, index, onNavigate }) => {
  const handleClick = useCallback(() => {
    onNavigate(category.id);
  }, [category.id, onNavigate]);

  return (
    <div
      className={`group relative bg-background-secondary rounded-2xl lg:rounded-3xl shadow-heritage-lg overflow-hidden hover:shadow-heritage-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-64 lg:h-80 overflow-hidden">
        <LazyImage 
          src={category.image} 
          alt={category.title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Highlight Badge */}
        <div className="absolute top-4 left-4 bg-action-accent/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <p className="font-poppins text-xs font-medium text-white">{category.highlight}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <h3 className="font-playfair text-xl lg:text-2xl font-bold text-text-heading mb-3 group-hover:text-action-accent transition-colors duration-300">
          {category.title}
        </h3>
        <p className="font-cormorant text-text-subtle leading-relaxed mb-4">
          {category.description}
        </p>
        
        {/* Learn More Button */}
        <button 
          onClick={handleClick}
          className="inline-flex items-center gap-2 font-poppins text-action-accent hover:text-action-primary font-medium transition-colors duration-300 group/btn hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-action-accent"
        >
          Learn More
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';

const EventsIntroSection: React.FC = () => {
  const navigate = useNavigate();

  // Memoized event categories data
  const eventCategories = useMemo<EventCategory[]>(() => [
    {
      id: 'weddings',
      title: 'Traditional Kerala décor on contract',
      description: 'Transform your special day into an unforgettable celebration with our authentic Kerala heritage backdrop.',
      image: '/images/Events/SAJAN-33.webp',
      highlight: 'Heritage Venue'
    },
    {
      id: 'corporate',
      title: 'Heritage architecture backdrop on contract',
      description: 'Host professional gatherings in a unique heritage environment that impresses clients and motivates teams.',
      image: '/images/Events/SAJAN-40.webp',
      highlight: 'Professional'
    },
    {
      id: 'cultural',
      title: 'In-house catering',
      description: 'Showcase traditional performances and cultural celebrations in an authentic heritage setting.',
      image: '/images/Events/SAJAN-37.webp',
      highlight: 'Traditional'
    }
  ], []);

  // Memoized features data
  const features = useMemo(() => [
    {
      icon: '🎭',
      title: 'Versatile Venues',
      description: 'Multiple spaces for different event types and sizes'
    },
    {
      icon: '🍽️',
      title: 'Catering Services',
      description: 'Traditional Kerala & multi-cuisine options'
    },
    {
      icon: '📸',
      title: 'Professional Support',
      description: 'Event coordination and photography services'
    },
    {
      icon: '🌿',
      title: 'Heritage Ambiance',
      description: 'Authentic colonial architecture and gardens'
    }
  ], []);

  // Optimized event handlers
  const handleExploreEvents = useCallback(() => {
    navigate('/events');
  }, [navigate]);

  const handleContactUs = useCallback(() => {
    navigate('/contact');
  }, [navigate]);

  const handleCategoryNavigate = useCallback((categoryId: string) => {
    navigate(`/events#${categoryId}`);
  }, [navigate]);

  return (
    <div className="relative bg-background overflow-hidden">
      {/* Optimized Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-gold rounded-full mix-blend-multiply filter blur-2xl animate-float" />
      </div>

      <div className="py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader 
            subtitle="Host Your Special Moments"
            title="Celebrate Your Moments in a Heritage Setting"
            description="Amritha Heritage is the perfect venue for intimate weddings, family gatherings, cultural events, or corporate meetings. Our indoor spaces and open lawn offer a charming and elegant setting for any occasion."
          />

          {/* Featured Event Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {eventCategories.map((category, index) => (
              <EventCard
                key={category.id}
                category={category}
                index={index}
                onNavigate={handleCategoryNavigate}
              />
            ))}
          </div>

          {/* Key Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 bg-background-secondary rounded-xl shadow-heritage hover:shadow-heritage-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4 animate-float">{feature.icon}</div>
                <h4 className="font-playfair text-lg font-bold text-text-heading mb-2 animate-text-shimmer bg-gradient-to-r from-text-heading via-action-accent to-text-heading bg-[length:400%] bg-clip-text">
                  {feature.title}
                </h4>
                <p className="font-cormorant text-sm text-text-subtle leading-relaxed animate-fade-in">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-action-primary/10 to-action-accent/10 border border-action-primary/20 rounded-2xl p-8 lg:p-12 mb-8 animate-fade-in-up">
              <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-text-heading mb-4 animate-float">
                Ready to Create Your Perfect Event?
              </h3>
              <p className="font-cormorant text-lg text-text-subtle max-w-2xl mx-auto mb-8 animate-fade-in">
                Let us help you plan and execute an unforgettable celebration in our heritage venue. 
                From intimate gatherings to grand celebrations, we have the perfect space for your special occasion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleExploreEvents}
                  className="btn btn-primary group text-base px-8 py-4 shadow-soft-sunlight-lg hover:shadow-golden-glow animate-float transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent active:scale-95 flex items-center justify-center gap-2 transition-all duration-300"
                >
                  Explore All Events
                  <ArrowRightIcon />
                </button>
                <button 
                  onClick={handleContactUs}
                  className="btn btn-ghost text-base px-8 py-4 shadow-soft-sunlight hover:shadow-golden-glow-sm animate-float transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent active:scale-95 transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(EventsIntroSection);
