import React, { memo } from 'react';
import LazyImage from '../ui/LazyImage';

// Simplified component without intersection observer for better performance

const TextContent = () => (
  <div className="space-y-8 flex flex-col items-center opacity-0 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]">
    {/* Elegant Subtitle */}
    <div className="flex items-center justify-center gap-3">
      <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
      <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
        Heritage Experience
      </span>
      <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
    </div>

    {/* Main Heading with floating animation */}
    <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
      <h2 
        id="welcome-heading" 
        className="text-h2 font-playfair text-foreground text-center relative animate-float"
      >
        Welcome to Amritha Heritage
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
      </h2>
    </div>

    {/* Description */}
    <p className="font-cormorant text-body text-foreground-subtle leading-relaxed text-center max-w-xl">
      A century-old colonial bungalow transformed into a boutique hotel in the heart of Thycaud, Thiruvananthapuram. A space where timeless architecture, lush courtyards, and refined hospitality come together for an unforgettable stay.
    </p>
    
    {/* Call-to-Action Button with simplified animations */}
    <div className="flex justify-center">
      <button className="btn btn-primary text-base px-8 py-3 shadow-soft-sunlight transition-all duration-300 hover:shadow-golden-glow hover:scale-105">
        Discover Our Story
      </button>
    </div>
  </div>
);

const ImageGallery = () => (
  <div className="relative opacity-0 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]">
    {/* Main Heritage Image with lazy loading and floating animation */}
    <div className="group card-base w-full max-w-2xl h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden transition-transform duration-300 hover:scale-105 animate-float">
      <LazyImage
        src="/images/home.webp"
        alt="The stately facade of Amritha Heritage bungalow"
        priority={true}
        width={800}
        height={1200}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
    
    {/* Floating Heritage Detail Image with lazy loading and floating animation */}
    <div className="group hidden sm:block absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 lg:-bottom-12 lg:-left-12 w-48 h-auto sm:w-64 lg:w-80 card-base overflow-hidden shadow-golden-glow-sm transition-transform duration-300 hover:scale-105 animate-float" style={{ animationDelay: '0.3s' }}>
      <LazyImage
        src="/images/home2.webp"
        alt="A detailed view of a lush courtyard at Amritha Heritage"
        width={400}
        height={600}
        className="aspect-[2/3] w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        quality={80}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>

    {/* Decorative Golden Accent - simplified */}
    <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-accent-gold rounded-full opacity-30" />
  </div>
);

const StartSection: React.FC = () => {
  return (
    <section 
      aria-labelledby="welcome-heading"
      className="min-h-screen bg-background flex items-center relative overflow-hidden py-20"
    >
      {/* Simplified Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-20 left-20 w-32 h-32 border border-accent rounded-full" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent-gold rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-primary rounded-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <TextContent />
          <ImageGallery />
        </div>
      </div>
    </section>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(StartSection);