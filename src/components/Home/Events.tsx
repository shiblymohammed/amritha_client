import React, { useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../ui/LazyImage';

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

// Remove the local LazyImage - using the optimized one from ui folder

 // Optimized SectionHeader component with maximum performance
const SectionHeader = memo<{ subtitle: string; title: string; description: string; }>(({ subtitle, title, description }) => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="w-12 h-0.5 bg-accent" />
      <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
        {subtitle}
      </p>
      <div className="w-12 h-0.5 bg-accent" />
    </div>
    <div className="animate-float">
      <h2 className="text-h2 font-playfair text-foreground mb-6 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-accent" />
      </h2>
    </div>
    <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto leading-relaxed mt-8">
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
       className={`group relative bg-background-secondary rounded-2xl lg:rounded-3xl shadow-soft-sunlight-lg overflow-hidden hover:shadow-golden-glow transition-all duration-300 hover:-translate-y-1`}
     >
      {/* Image Container */}
             <div className="relative h-56 lg:h-72 overflow-hidden">
                <LazyImage 
          src={category.image} 
          alt={category.title} 
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          quality={80}
        />
                 <div className="absolute inset-0 bg-black/40" />
        
        {/* Highlight Badge */}
                 <div className="absolute top-4 left-4 bg-accent px-3 py-1.5 rounded-full">
           <p className="font-poppins text-xs font-medium text-white">{category.highlight}</p>
         </div>
      </div>

      {/* Content */}
             <div className="p-4 lg:p-6">
                         <div className="animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
          <h3 className="font-playfair text-xl lg:text-2xl font-bold text-text-heading mb-3 group-hover:text-accent transition-colors duration-300">
            {category.title}
          </h3>
        </div>
                 <p className="font-cormorant text-foreground-subtle leading-relaxed mb-4">
          {category.description}
        </p>
        
        {/* Learn More Button */}
                 <button 
           onClick={handleClick}
           className="inline-flex items-center gap-2 font-poppins text-accent hover:text-accent-gold font-medium transition-colors duration-300 group/btn hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent"
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
         <div className="relative bg-background">
             {/* Removed all decorative background elements for maximum performance */}

             <div className="py-16 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionHeader 
            subtitle="Host Your Special Moments"
            title="Celebrate Your Moments in a Heritage Setting"
            description="Amritha Heritage is the perfect venue for intimate weddings, family gatherings, cultural events, or corporate meetings. Our indoor spaces and open lawn offer a charming and elegant setting for any occasion."
          />

          {/* Featured Event Categories Grid */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
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
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                                 className="text-center p-4 bg-background-secondary rounded-xl shadow-soft-sunlight hover:shadow-golden-glow transition-all duration-300 hover:-translate-y-1"
              >
                                 <div className="text-4xl mb-4">{feature.icon}</div>
                                                  <div className="animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
          <h4 className="font-playfair text-lg font-bold text-foreground mb-2">
            {feature.title}
          </h4>
        </div>
         <p className="font-cormorant text-sm text-foreground-subtle leading-relaxed">
          {feature.description}
        </p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
                      <div className="bg-background-secondary border border-accent/20 rounded-2xl p-6 lg:p-8 mb-8">
                                                <div className="animate-float">
            <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Ready to Create Your Perfect Event?
            </h3>
          </div>
             <p className="font-cormorant text-lg text-foreground-subtle max-w-2xl mx-auto mb-8">
              Let us help you plan and execute an unforgettable celebration in our heritage venue. 
              From intimate gatherings to grand celebrations, we have the perfect space for your special occasion.
            </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                                 <div className="animate-float" style={{ animationDelay: '0.2s' }}>
                  <button 
                    onClick={handleExploreEvents}
                    className="btn btn-primary group text-base px-8 py-4 shadow-soft-sunlight-lg hover:shadow-golden-glow hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent active:scale-95 flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    Explore All Events
                    <ArrowRightIcon />
                  </button>
                </div>
                <div className="animate-float" style={{ animationDelay: '0.4s' }}>
                  <button 
                    onClick={handleContactUs}
                    className="btn btn-ghost text-base px-8 py-4 shadow-soft-sunlight hover:shadow-golden-glow-sm hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent active:scale-95 transition-all duration-300"
                  >
                    Contact Us
                  </button>
                </div>
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
