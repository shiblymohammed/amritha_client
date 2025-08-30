import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Local ArrowRightIcon component
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// SectionHeader component inline
const SectionHeader: React.FC<{ subtitle: string; title: string; description: string; }> = ({ subtitle, title, description }) => (
  <motion.div
    className="text-center mb-16"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
  >
    <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">
      {subtitle}
    </p>
    <h2 className="text-h2 font-playfair text-text-heading mb-6 relative inline-block">
      {title}
      <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></span>
    </h2>
    <p className="text-lg font-cormorant text-text-subtle max-w-3xl mx-auto leading-relaxed mt-8">
      {description}
    </p>
  </motion.div>
);

const EventsIntroSection: React.FC = () => {
  const navigate = useNavigate();

  const eventCategories = [
    {
      id: 'weddings',
      title: 'Traditional Kerala décor on contract',
      description: 'Transform your special day into an unforgettable celebration with our authentic Kerala heritage backdrop.',
      image: '/images/Events/SAJAN-33.webp',
      // capacity: '50-300 guests',
      highlight: 'Heritage Venue'
    },
    {
      id: 'corporate',
      title: 'Heritage architecture backdrop on contrac',
      description: 'Host professional gatherings in a unique heritage environment that impresses clients and motivates teams.',
      image: '/images/Events/SAJAN-40.webp',
      // capacity: '10-200 attendees',
      highlight: 'Professional'
    },
    {
      id: 'cultural',
      title: 'In-house catering',
      description: 'Showcase traditional performances and cultural celebrations in an authentic heritage setting.',
      image: '/images/Events/SAJAN-37.webp',
      // capacity: '30-250 guests',
      highlight: 'Traditional'
    }
  ];

  const handleExploreEvents = () => {
    navigate('/events');
  };

  return (
    <div className="relative bg-background overflow-hidden">

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-action-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-action-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
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
              <motion.div
                key={category.id}
                className="group relative bg-background-secondary rounded-2xl lg:rounded-3xl shadow-heritage-lg overflow-hidden hover:shadow-heritage-xl transition-all duration-500 transform hover:-translate-y-2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: index * 0.2 }}
              >
                {/* Image Container */}
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                    loading="lazy" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  
                  {/* Capacity Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <p className="font-poppins text-xs font-medium text-text-heading">{category.capacity}</p>
                  </div>
                  
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
                    onClick={() => navigate(`/events#${category.id}`)}
                    className="inline-flex items-center gap-2 font-poppins text-action-accent hover:text-action-primary font-medium transition-colors duration-300 group/btn"
                  >
                    Learn More
                    <ArrowRightIcon />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
            {[
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
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-background-secondary rounded-xl shadow-heritage hover:shadow-heritage-lg transition-all duration-300 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="font-playfair text-lg font-bold text-text-heading mb-2">
                  {feature.title}
                </h4>
                <p className="font-cormorant text-sm text-text-subtle leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="bg-gradient-to-r from-action-primary/10 to-action-accent/10 border border-action-primary/20 rounded-2xl p-8 lg:p-12 mb-8"
            >
              <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-text-heading mb-4">
                Ready to Create Your Perfect Event?
              </h3>
              <p className="font-cormorant text-lg text-text-subtle max-w-2xl mx-auto mb-8">
                Let us help you plan and execute an unforgettable celebration in our heritage venue. 
                From intimate gatherings to grand celebrations, we have the perfect space for your special occasion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleExploreEvents}
                  className="group font-poppins bg-action-primary text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 transform hover:bg-action-primary-hover hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95 flex items-center justify-center"
                >
                  Explore All Events
                  <ArrowRightIcon />
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="font-poppins bg-transparent border-2 border-action-primary text-action-primary px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-action-primary hover:border-action-primary hover:text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-accent active:scale-95"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsIntroSection;
